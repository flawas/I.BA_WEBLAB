import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { TechnologiesEntity } from './entities/technologies.entity';
import {IsUUID} from "class-validator";

@ApiBearerAuth()
@ApiTags('technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create technology' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTechnologiesDto: CreateTechnologiesDto): Promise<TechnologiesEntity> {
    return this.technologiesService.create(createTechnologiesDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a specific technlogy' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TechnologiesEntity,
  })
  findOne(@Param('uuid') uuid: string): TechnologiesEntity {
    return this.technologiesService.findOne(uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({
    status: 200,
    description: 'All technologies',
    type: [TechnologiesEntity],
  })
  findAll(): TechnologiesEntity[] {
    return this.technologiesService.findAll();
  }
}