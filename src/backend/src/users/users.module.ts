import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersEntity, UsersSchema} from "./entities/users.entity";
import {UsersController} from "./users.controller";
import {PasswordsModule} from "../passwords/passwords.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsersEntity.name, schema: UsersSchema }]),
    PasswordsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
