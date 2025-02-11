import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { TechnologiesEntity } from './entities/technologies.entity';
import {UpdateTechnologiesDto} from "./dto/update-technologies.dto";

@ApiBearerAuth()
@ApiTags('technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create technology' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Request() req, @Body() createTechnologiesDto: CreateTechnologiesDto): Promise<TechnologiesEntity> {
    return this.technologiesService.create(req, createTechnologiesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific technlogy' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TechnologiesEntity,
  })
  findOne(@Request() req, @Param('id') id: string): Promise<TechnologiesEntity> {
    return this.technologiesService.findOne(req, id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({
    status: 200,
    description: 'All technologies',
    type: [TechnologiesEntity],
  })
  findAll(@Request() req): Promise<TechnologiesEntity[]> {
    return this.technologiesService.findAll(req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific technology' })
  @ApiResponse({
      status: 200,
      description: 'The found record',
      type: TechnologiesEntity,
  })
  update(@Request() req, @Param('id') id: string, @Body() updateTechnologiesDto: UpdateTechnologiesDto): Promise<TechnologiesEntity> {
      return this.technologiesService.update(req, id, updateTechnologiesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific technology' })
  @ApiResponse({
      status: 200,
      description: 'The found record',
      type: TechnologiesEntity,
  })
  delete(@Request() req, @Param('id') id: string): Promise<TechnologiesEntity> {
    return this.technologiesService.delete(req, id);
  }

}