import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUsersDto} from "./dto/create-users.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsersEntity} from "./entities/users.entity";
import {ApiBearerAuth} from "@nestjs/swagger";
import {PasswordsService} from "../passwords/passwords.service";

@ApiBearerAuth()
@Injectable()
export class UsersService {

  constructor(
      @InjectModel(UsersEntity.name) private readonly userModel: Model<UsersEntity>,
      private passwordService: PasswordsService,
  ) {}

  async create(createUserDto: CreateUsersDto): Promise<UsersEntity> {
    const newUser = new this.userModel(createUserDto);
    const passsword = newUser.password
    newUser.password = await this.passwordService.create({plainTextPassword: passsword});
    return await newUser.save();
  }

  async findOneByUsername(username: string): Promise<UsersEntity | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
