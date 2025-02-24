import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import {PasswordsModule} from "../passwords/passwords.module";
import {PasswordsService} from "../passwords/passwords.service";
import {LogService} from "../log/log.service";
import {MongooseModule} from "@nestjs/mongoose";
import {LogEntity, LogSchema} from "../log/entities/log.entity";

@Module({
  imports: [
    UsersModule,
    PasswordsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }])
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, LogService, PasswordsService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}