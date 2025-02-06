import { Module } from '@nestjs/common';
import {TechnologiesModule} from "./technologies/technologies.module";
import {CategoriesModule} from "./categories/categories.module";
import {RingsModule} from "./ring/rings.module";
import {WelcomeController} from "./welcome.controller";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {PasswordsModule} from "./passwords/passwords.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/techradardb'), TechnologiesModule,
    CategoriesModule, RingsModule, AuthModule, UsersModule, PasswordsModule],
  controllers: [WelcomeController],
})
export class AppModule {}
