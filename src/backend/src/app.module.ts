import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologiesModule } from './technologies/technologies.module';
import { CategoriesModule } from './categories/categories.module';
import { RingsModule } from './ring/rings.module';
import { WelcomeController } from './welcome.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordsModule } from './passwords/passwords.module';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { LogsModule } from './log/logs.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    TechnologiesModule,
    CategoriesModule,
    RingsModule,
    AuthModule,
    UsersModule,
    PasswordsModule,
    LogsModule,
  ],
  controllers: [WelcomeController],
})
export class AppModule {}