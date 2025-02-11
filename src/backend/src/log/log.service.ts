import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {LogEntity} from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class LogService {

  constructor(
      @InjectModel(LogEntity.name) private readonly categoriesModel: Model<LogEntity>
  ) {}

  async create(createLogDto: CreateLogDto): Promise<LogEntity> {
    try {
      const dto = new this.categoriesModel(createLogDto);
      dto.creationDate = new Date();
      return await dto.save();
    } catch (error) {
      console.error('Error creating log:', error);
      throw new InternalServerErrorException('Error creating log');
    }
  }

  async findAll(): Promise<LogEntity[]> {
    try {
      console.log('Get all logs');
      return await this.categoriesModel.find().exec();
    } catch (error) {
      console.error('No logs found:', error);
      throw new NotFoundException('No logs found');
    }
  }

}