import { Module } from '@nestjs/common';
import {TechnologiesModule} from "./technologies/technologies.module";

@Module({
  imports: [TechnologiesModule],
})
export class AppModule {}
