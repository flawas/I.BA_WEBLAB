import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RingsService } from './rings.service';
import { CreateRingsDto} from "./dto/create-rings.dto";
import { RingsEntity } from './entities/ringsEntity';
import {UpdateRingsDto} from "./dto/update-rings.dto";
import {Roles} from "../roles/decorators/roles.decorator";
import {Role} from "../roles/roles.enum";

@ApiBearerAuth()
@ApiTags('rings')
@Controller('rings')
@Roles(Role.Admin)
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create ring' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Ring created', type: RingsEntity })
  async create(@Request() req, @Body() createRingsDto: CreateRingsDto): Promise<RingsEntity> {
    return this.ringsService.create(req, createRingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rings' })
  @ApiResponse({
    status: 200,
    description: 'All rings',
    type: RingsEntity,
  })
  async findAll(@Request() req): Promise<RingsEntity[]> {
    return this.ringsService.findAll(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'The found ring',
    type: RingsEntity,
  })
  async findOne(@Request() req ,@Param('id') id: string): Promise<RingsEntity> {
    return this.ringsService.findOne(req, id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'The updated ring',
    type: RingsEntity,
  })
  async update(@Request() req, @Param('id') id: string, @Body() updateRingsDto: UpdateRingsDto): Promise<RingsEntity> {
    return this.ringsService.update(req, id, updateRingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'Delete a ring',
    type: RingsEntity,
  })
  async delete(@Request() req ,@Param('id') id: string): Promise<RingsEntity> {
    return this.ringsService.delete(req, id);
  }
}