import { Module } from '@nestjs/common';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import {LogService} from "../log/log.service";
import {MongooseModule} from "@nestjs/mongoose";
import {LogEntity, LogSchema} from "../log/entities/log.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }])
  ],
  controllers: [PasswordsController],
  providers: [PasswordsService, LogService],
  exports: [PasswordsService],
})
export class PasswordsModule {}
