import { Module } from '@nestjs/common';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';
import {RingEntity, RingsSchema} from "./entities/ring.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {TechnologiesEntity, TechnologiesSchema} from "../technologies/entities/technologies.entity";
import {LogEntity, LogSchema} from "../log/entities/log.entity";
import {LogService} from "../log/log.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RingEntity.name, schema: RingsSchema }]),
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }]),
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }])

  ],
  controllers: [RingsController],
  providers: [RingsService, LogService],
})
export class RingsModule {}
