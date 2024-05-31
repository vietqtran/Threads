import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './entities/user.entity'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { UpdateUserDto } from './dto/update-user.dto'
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.userModel.findOneAndUpdate(
      { email: createUserDto.email },
      createUserDto,
      { upsert: true, new: true }
    )
    if (!existedUser) {
      throw new HttpException(
        'Error while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return existedUser
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true }
    )
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return updatedUser
  }

  async findAll() {
    return this.userModel.find()
  }

  async findOne(queries: FilterQuery<UserDocument>) {
    return this.userModel.findOne(queries)
  }

  async findOneAndSelectPassword(queries: FilterQuery<UserDocument>) {
    return this.userModel.findOne(queries, { password: 0 })
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      hashedRefreshToken: await argon2.hash(refreshToken)
    })
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      return null
    }
    const isRefreshTokenMatching = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken
    )
    return isRefreshTokenMatching ? user : null
  }

  async removeRefreshToken(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { hashedRefreshToken: null })
  }
}
