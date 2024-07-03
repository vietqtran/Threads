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
    const user = await this.userModel.findOne(queries).select('+hashedPassword')
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
    await this.userModel.findByIdAndUpdate(userId, { hashedRefreshToken: null })
  }

  async toggleFollowUser(followUserDto: FollowUserDto) {
    const { from, to, isAccepted } = followUserDto
    const user = await this.findOne({ _id: from })
    const isFollowed = user.following.some(
      (following) => following.user._id.toString() === to
    )

    if (isFollowed) {
      user.following = user.following.filter(
        (following) => following.user._id.toString() !== to
      )
    } else {
      const followedUser = await this.findOne({ _id: to })
      user.following.push({ user: followedUser, isAccepted })
    }

    await user.save()
    return user
  }

  async acceptFollow(acceptFollowDto: AcceptFollowDto) {
    const { from, to } = acceptFollowDto
    const user = await this.findOne({ _id: from })
    user.following = user.following.map((following) =>
      following.user._id.toString() === to
        ? { ...following, isAccepted: true }
        : following
    )
    await user.save()
    return user
  }

  async getFollowingUsers(id: string) {
    const user = await this.findOne({ _id: id })
    return user.following
      .filter((following) => following.isAccepted)
      .map((following) => following.user)
  }
}
