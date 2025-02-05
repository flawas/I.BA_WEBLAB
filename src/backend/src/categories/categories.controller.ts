import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto} from "./dto/create-technologies.dto";
import { CategoriesEntity } from './entities/categories.entity';
import {IsUUID} from "class-validator";

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTechnologiesDto: CreateCategoriesDto): Promise<CategoriesEntity> {
    return this.categoriesService.create(createTechnologiesDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a specific category' })
  @ApiResponse({
    status: 200,
    description: 'The found category',
    type: CategoriesEntity,
  })
  findOne(@Param('uuid') uuid: string): CategoriesEntity {
    return this.categoriesService.findOne(uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories',
    type: [CategoriesEntity],
  })
  findAll(): CategoriesEntity[] {
    return this.categoriesService.findAll();
  }
}