import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {LogEntity} from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ServiceName} from "./enums/serviceName.enum";
import {JwtService} from "@nestjs/jwt";
import {Severity} from "./enums/severity.enum";


@Injectable()
export class LogService {
  constructor(
      @InjectModel(LogEntity.name) private readonly logEntityModel: Model<LogEntity>,
      private jwtService: JwtService,
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
      const createLogDto = { service: ServiceName.LOG, severity: Severity.ERROR, description: `No logs found ${error}`, public: false } as CreateLogDto;
      await this.create(request, createLogDto);
      throw new InternalServerErrorException('Error creating log');
    }
  }

  async findAll(request: Request): Promise<LogEntity[]> {
    try {
      const createLogDto = { service: ServiceName.LOG, severity: Severity.INFO, description: `Get all logs`, public: false } as CreateLogDto;
      await this.create(request, createLogDto);
      return await this.logEntityModel.find().sort({ creationDate: -1 }).exec();
    } catch (error) {
      const createLogDto = { service: ServiceName.LOG, severity: Severity.ERROR, description: `No logs found`, public: false } as CreateLogDto;
      await this.create(request, createLogDto);
      throw new NotFoundException('No logs found');
    }
  }

  async findPublicLogs(request: Request): Promise<LogEntity[]> {
    try {
      const createLogDto = { service: ServiceName.LOG, severity: Severity.INFO, description: `Get all puglic logs`, public: false } as CreateLogDto;
      await this.create(request, createLogDto);
      return await this.logEntityModel.find({ public: true }).sort({ creationDate: -1 }).exec();
    } catch (error) {
      const createLogDto = { service: ServiceName.LOG, severity: Severity.ERROR, description: `No public logs found ${error}`, public: false } as CreateLogDto;
      await this.create(request, createLogDto);
      throw new NotFoundException('No public logs found');
    }
  }

}