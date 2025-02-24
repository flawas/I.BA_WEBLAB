import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,} from '@nestjs/swagger';
import {CategoriesService} from './categories.service';
import {CreateCategoriesDto} from "./dto/create-categories.dto";
import {CategoriesEntity} from './entities/categories.entity';
import {UpdateCategoriesDto} from "./dto/update-categories.dto";
import {Roles} from "../roles/decorators/roles.decorator";
import {Role} from "../roles/roles.enum";

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly ringsService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Category created', type: CategoriesEntity })
  async create(@Request() req, @Body() createCategoriesDto: CreateCategoriesDto): Promise<CategoriesEntity> {
    return this.ringsService.create(req, createCategoriesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories',
    type: CategoriesEntity,
  })
  findAll(@Request() req): Promise<CategoriesEntity[]> {
    return this.ringsService.findAll(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific category' })
  @ApiResponse({
    status: 200,
    description: 'The found category',
    type: CategoriesEntity,
  })
  findOne(@Request() req, @Param('id') id: string): Promise<CategoriesEntity> {
    return this.ringsService.findOne(req, id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific category' })
  @ApiResponse({
    status: 200,
    description: 'The updated category',
    type: CategoriesEntity,
  })
  update(@Request() req, @Param('id') id: string, @Body() updateRingsDto: UpdateCategoriesDto): Promise<CategoriesEntity> {
    return this.ringsService.update(req, id, updateRingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific category' })
  @ApiResponse({
    status: 200,
    description: 'Delete a category',
    type: CategoriesEntity,
  })
  delete(@Request() req,@Param('id') id: string): Promise<CategoriesEntity> {
    return this.ringsService.delete(req, id);
  }
}