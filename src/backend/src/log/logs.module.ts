import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import {LogEntity, LogSchema} from "./entities/log.entity";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }])
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogsModule {}
