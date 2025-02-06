import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RingsService } from './rings.service';
import { CreateRingsDto} from "./dto/create-rings.dto";
import { RingEntity } from './entities/ring.entity';
import {UpdateRingsDto} from "./dto/update-rings.dto";

@ApiBearerAuth()
@ApiTags('rings')
@Controller('rings')
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create ring' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Ring created', type: RingEntity })
  async create(@Body() createRingsDto: CreateRingsDto): Promise<RingEntity> {
    return this.ringsService.create(createRingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rings' })
  @ApiResponse({
    status: 200,
    description: 'All rings',
    type: RingEntity,
  })
  findAll(): Promise<RingEntity[]> {
    return this.ringsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'The found ring',
    type: RingEntity,
  })
  findOne(@Param('id') id: string): Promise<RingEntity> {
    return this.ringsService.findOne(id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'The updated ring',
    type: RingEntity,
  })
  update(@Param('id') id: string, @Body() updateRingsDto: UpdateRingsDto): Promise<RingEntity> {
    return this.ringsService.update(id, updateRingsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'Delete a ring',
    type: RingEntity,
  })
  delete(@Param('id') id: string): Promise<RingEntity> {
    return this.ringsService.delete(id);
  }
}