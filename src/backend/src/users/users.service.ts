import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUsersDto} from "./dto/create-users.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsersEntity} from "./entities/users.entity";
import {ApiBearerAuth} from "@nestjs/swagger";
import {PasswordsService} from "../passwords/passwords.service";
import {Request} from "express";
import {UpdateUsersDto} from "./dto/update-users.dto";
import {ServiceName} from "../log/enums/serviceName.enum";
import {Severity} from "../log/enums/severity.enum";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {LogService} from "../log/log.service";

@ApiBearerAuth()
@Injectable()
export class UsersService {

  constructor(
      @InjectModel(UsersEntity.name) private readonly userModel: Model<UsersEntity>,
      private passwordService: PasswordsService,
      private logService: LogService
  ) {}

  async create(request: Request, createUserDto: CreateUsersDto): Promise<UsersEntity> {
    // Check if the username already exists
    const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
    if (existingUser) {
      throw new Error(`User with username ${createUserDto.username} already exists`);
    }

    const newUser = new this.userModel(createUserDto);
    newUser.password = await this.passwordService.create(request, { plainTextPassword: newUser.password });
    newUser.roles = ['user'];
    newUser.creationDate = new Date();
    const createLogDto = {
      service: ServiceName.USERS,
      severity: Severity.INFO,
      description: `Created user ${createUserDto.username}`,
      public: true
    } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return await newUser.save();
  }

  async findOneByUsername(request: Request, username: string): Promise<UsersEntity | undefined> {
    const createLogDto = {
      service: ServiceName.USERS,
      severity: Severity.DEBUG,
      description: `Finding user by username  ${username} `,
      public: false
    } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(request: Request): Promise<UsersEntity[]> {
    const createLogDto = {
      service: ServiceName.USERS,
      severity: Severity.DEBUG,
      description: `Finding all users`,
      public: false
    } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return this.userModel.find().select('-password').exec();
  }

  async updateUser(request: Request, id: string, updateUserDto: UpdateUsersDto): Promise<UsersEntity> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      const createLogDto = {
        service: ServiceName.USERS,
        severity: Severity.ERROR,
        description: `User with id ${id} not found`,
        public: true
      } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.mail = updateUserDto.mail;
    user.roles = updateUserDto.roles;
    user.lastUpdate = new Date();
    const createLogDto = {
      service: ServiceName.USERS,
      severity: Severity.INFO,
      description: `Updated user with id ${id}`,
      public: true
    } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return await user.save();
  }

  async deleteUser(request: Request, id: string): Promise<UsersEntity> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      const createLogDto = {
        service: ServiceName.USERS,
        severity: Severity.ERROR,
        description: `User with id ${id} not found`,
        public: true
      } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const createLogDto = {
      service: ServiceName.USERS,
      severity: Severity.INFO,
      description: `Deleted user with id ${id}`,
      public: true
    } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    await user.deleteOne();
    return user;
  }

}
