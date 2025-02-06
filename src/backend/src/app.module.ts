import { Module } from '@nestjs/common';
import {TechnologiesModule} from "./technologies/technologies.module";
import {CategoriesModule} from "./categories/categories.module";
import {RingsModule} from "./ring/rings.module";
import {WelcomeController} from "./welcome.controller";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [TechnologiesModule, CategoriesModule, RingsModule],
  controllers: [WelcomeController],
})
export class AppModule {}
