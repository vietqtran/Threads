import { UserNotFoundException } from '@/common/exceptions/UserNotFound.exception'
import { UserExistedException } from '@/common/exceptions/UserExisted.exception'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as argon2 from 'argon2'
import { FilterQuery, Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'
import { AcceptFollowDto, FollowUserDto } from './dto/follow-user'
import { ConflictException } from '@/common/exceptions/ConflictException'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    private getCreateFieldForSearch(email: string, phone: string) {
        if (email) return { email }
        if (phone) return { phoneNumber: phone }
        return {}
    }

    async create(createUserDto: CreateUserDto) {
        const existedUser = await this.userModel.findOne({
            $or: [
                this.getCreateFieldForSearch(
                    createUserDto.email,
                    createUserDto.phoneNumber
                ),
                { username: createUserDto.username }
            ]
        })
        if (existedUser) throw new UserExistedException()
        return this.userModel.create(createUserDto)
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            updateUserDto,
            { new: true }
        )
        if (!updatedUser) throw new UserNotFoundException()
        return updatedUser
    }

    async findAll() {
        return this.userModel.find()
    }

    async findOne(queries: FilterQuery<UserDocument>) {
        const user = await this.userModel.findOne(queries)
        if (!user) throw new UserNotFoundException()
        return user
    }

    async findOneWithoutException(queries: FilterQuery<UserDocument>) {
        return this.userModel.findOne(queries)
    }

    async getUserForLogin(queries: FilterQuery<UserDocument>) {
        const user = await this.userModel
            .findOne(queries)
            .select('+hashedPassword')
        if (!user) throw new UserNotFoundException()
        return user
    }

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userModel.findByIdAndUpdate(userId, { hashedRefreshToken })
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
        const user = await this.userModel
            .findById(userId)
            .select('+hashedRefreshToken')
        if (!user) return null
        const isRefreshTokenMatching = await argon2.verify(
            user.hashedRefreshToken,
            refreshToken
        )
        return isRefreshTokenMatching ? user : null
    }

    async removeRefreshToken(userId: string) {
        await this.userModel.findByIdAndUpdate(userId, {
            hashedRefreshToken: null
        })
    }

    async toggleFollowUser(followUserDto: FollowUserDto) {
        if (followUserDto.from === followUserDto.to)
            throw new ConflictException('Cannot follow yourself')
        const { from, to, isAccepted } = followUserDto
        const fromUser = await this.findOne({ _id: from })
        const toUser = await this.findOne({ _id: to })

        const isToUserAccepted = toUser.followers.some(
            (follower) => follower.user.toString() === from
        )
        if (!isToUserAccepted)
            throw new ConflictException('User is not accepted')

        const isFollowed = fromUser.following.some(
            (following) => following.user.toString() === to
        )

        if (isFollowed) {
            fromUser.following = fromUser.following.filter(
                (following) => following.user.toString() !== to
            )
            toUser.followers = toUser.followers.filter(
                (follower) => follower.user.toString() !== from
            )
        } else {
            fromUser.following.push({ user: toUser.id, isAccepted })
            toUser.followers.push({ user: fromUser.id })
        }

        Promise.all([fromUser.save(), toUser.save()])
            .then(() => {
                return true
            })
            .catch(() => {
                return false
            })
    }

    async acceptFollow(acceptFollowDto: AcceptFollowDto) {
        if (acceptFollowDto.from === acceptFollowDto.to)
            throw new ConflictException('Cannot follow yourself')
        const { from, to } = acceptFollowDto
        const fromUser = await this.findOne({ _id: from })
        fromUser.following = fromUser.following.map((following) =>
            following.user.toString() === to
                ? { ...following, isAccepted: true }
                : following
        )
        const toUser = await this.findOne({ _id: to })
        toUser.followers.push({ user: fromUser.id })
        Promise.all([fromUser.save(), toUser.save()])
            .then(() => {
                return true
            })
            .catch(() => {
                return false
            })
    }

    async getFollowingUsers(id: string) {
        const user = await this.findOne({ _id: id })
        const followingIds = user.following
            .filter((following) => following.isAccepted)
            .map((following) => following.user)

        const followingUsers = await this.userModel
            .find({ _id: { $in: followingIds } })
            .select('-hashedPassword')
        return followingUsers
    }

    async getFollowersUsers(id: string) {
        const user = await this.findOne({ _id: id })
        const followersIds = user.followers.map((followers) => followers.user)

        const followersUsers = await this.userModel
            .find({ _id: { $in: followersIds } })
            .select('-hashedPassword')
        return followersUsers
    }
}
