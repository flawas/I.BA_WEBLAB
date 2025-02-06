import { Module } from '@nestjs/common';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TechnologiesEntity, TechnologiesSchema} from "./entities/technologies.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }]),
  ],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}