import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {LogEntity} from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ServiceName} from "./enums/serviceName.enum";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class LogService {

  constructor(
      @InjectModel(LogEntity.name) private readonly logEntityModel: Model<LogEntity>,
      private jwtService: JwtService
  ) {}

  async create(request, createLogDto: CreateLogDto): Promise<LogEntity> {
    const dto = new this.logEntityModel(createLogDto);

    if(request.user != undefined) {
      dto.user = request.user.username.toString();
    } else {
      dto.user = ''
    }

    try {
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
      return await this.logEntityModel.find().sort({ creationDate: -1 }).exec();
    } catch (error) {
      console.error('No logs found:', error);
      throw new NotFoundException('No logs found');
    }
  }

  async findPublicLogs(): Promise<LogEntity[]> {
    try {
      return await this.logEntityModel.find({ public: true }).sort({ creationDate: -1 }).exec();
    } catch (error) {
      console.error('Error finding public logs:', error);
      throw new NotFoundException('No public logs found');
    }
  }

}