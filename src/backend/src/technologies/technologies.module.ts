import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesEntity, TechnologiesSchema } from './entities/technologies.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import {LogsModule} from "../log/logs.module";
import {CategoriesService} from "../categories/categories.service";
import {UsersService} from "../users/users.service";
import {PasswordsService} from "../passwords/passwords.service";
import {LogService} from "../log/log.service";
import {CategoriesEntity, CategoriesSchema} from "../categories/entities/categories.entity";
import {UsersEntity, UsersSchema} from "../users/entities/users.entity";
import {LogEntity, LogSchema} from "../log/entities/log.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }]),
    MongooseModule.forFeature([{ name: CategoriesEntity.name, schema: CategoriesSchema }]),
    MongooseModule.forFeature([{ name: UsersEntity.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }]),


    JwtModule,
    CategoriesModule,
    LogsModule,
    AuthModule
  ],
  providers: [
    TechnologiesService,
    AuthService, CategoriesService, UsersService, PasswordsService, LogService
  ],
  controllers: [TechnologiesController],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}