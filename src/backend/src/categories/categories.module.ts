import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import {CategoriesEntity, CategoriesSchema} from "./entities/categories.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {TechnologiesEntity, TechnologiesSchema} from "../technologies/entities/technologies.entity";
import {LogEntity, LogSchema} from "../log/entities/log.entity";
import {LogService} from "../log/log.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoriesEntity.name, schema: CategoriesSchema }]),
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }]),
    MongooseModule.forFeature([{ name: LogEntity.name, schema: LogSchema }])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, LogService],
})
export class CategoriesModule {}
