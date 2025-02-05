import { Module } from '@nestjs/common';
import {TechnologiesModule} from "./technologies/technologies.module";
import {CategoriesModule} from "./categories/categories.module";
import {RingsModule} from "./ring/rings.module";

@Module({
  imports: [TechnologiesModule, CategoriesModule, RingsModule],
})
export class AppModule {}
