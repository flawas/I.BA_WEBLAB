import { Module } from '@nestjs/common';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';
import {RingEntity, RingsSchema} from "./entities/ring.entity";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RingEntity.name, schema: RingsSchema }]),
  ],
  controllers: [RingsController],
  providers: [RingsService],
})
export class RingsModule {}
