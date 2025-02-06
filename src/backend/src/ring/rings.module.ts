import { Module } from '@nestjs/common';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';
import {RingEntity, RingsSchema} from "./entities/ring.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {TechnologiesEntity, TechnologiesSchema} from "../technologies/entities/technologies.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RingEntity.name, schema: RingsSchema }]),
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }])
  ],
  controllers: [RingsController],
  providers: [RingsService],
})
export class RingsModule {}
