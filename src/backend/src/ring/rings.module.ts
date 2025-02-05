import { Module } from '@nestjs/common';
import { RingsController } from './rings.controller';
import { RingsService } from './rings.service';

@Module({
  controllers: [RingsController],
  providers: [RingsService],
})
export class RingsModule {}
