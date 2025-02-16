import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUsersDto} from "./dto/create-users.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsersEntity} from "./entities/users.entity";
import {ApiBearerAuth} from "@nestjs/swagger";
import {PasswordsService} from "../passwords/passwords.service";
import {Request} from "express";

@ApiBearerAuth()
@Injectable()
export class UsersService {

  constructor(
      @InjectModel(UsersEntity.name) private readonly userModel: Model<UsersEntity>,
      private passwordService: PasswordsService,
  ) {}

  async create(request: Request, createUserDto: CreateUsersDto): Promise<UsersEntity> {
    const newUser = new this.userModel(createUserDto);
    newUser.password = await this.passwordService.create(request, {plainTextPassword: newUser.password});
    newUser.roles = ['user'];
    console.log('Created user', newUser.username);
    return await newUser.save();
  }

  async findOneByUsername(request: Request, username: string): Promise<UsersEntity | undefined> {
    console.log('Finding user by username', username);
    return this.userModel.findOne({ username }).exec();
  }
}
