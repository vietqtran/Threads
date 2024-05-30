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
    const existedUser = await this.userModel
      .findOne({
        email: createUserDto.email
      })
      .exec()
    if (existedUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const createdUser = await this.userModel.create(createUserDto)
    const savedUser = await createdUser.save()
    if (!savedUser) {
      throw new HttpException(
        'Error while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return savedUser
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .setOptions({ overwrite: true, new: true })
      .exec()
    if (!updatedUser) {
      throw new HttpException(
        'Error while updating user',
        HttpStatus.BAD_REQUEST
      )
    }
    return updatedUser
  }

  async findAll() {
    const users = await this.userModel.find().exec()
    if (!users) {
      return []
    }
    return users
  }

  async findOne(queries: FilterQuery<UserDocument>) {
    const user = await this.userModel.findOne(queries).exec()
    return user
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await argon2.hash(refreshToken)
    await this.update(userId, {
      hashedRefreshToken: currentHashedRefreshToken
    })
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findOne({ _id: userId })
    const isRefreshTokenMatching = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken
    )
    if (isRefreshTokenMatching) {
      return user
    }
  }

  async removeRefreshToken(userId: string) {
    await this.update(userId, {
      hashedRefreshToken: null
    })
  }
}
