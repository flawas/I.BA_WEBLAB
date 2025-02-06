import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import {CategoriesEntity, RingsSchema} from "./entities/categories.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {TechnologiesEntity, TechnologiesSchema} from "../technologies/entities/technologies.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoriesEntity.name, schema: RingsSchema }]),
    MongooseModule.forFeature([{ name: TechnologiesEntity.name, schema: TechnologiesSchema }])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
