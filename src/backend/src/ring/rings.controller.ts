import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RingsService } from './rings.service';
import { CreateRingsDto} from "./dto/create-rings.dto";
import { RingEntity } from './entities/ring.entity';

@ApiBearerAuth()
@ApiTags('rings')
@Controller('rings')
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create ring' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTechnologiesDto: CreateRingsDto): Promise<RingEntity> {
    return this.ringsService.create(createTechnologiesDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a specific ring' })
  @ApiResponse({
    status: 200,
    description: 'The found ring',
    type: RingEntity,
  })
  findOne(@Param('uuid') uuid: string): RingEntity {
    return this.ringsService.findOne(uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rings' })
  @ApiResponse({
    status: 200,
    description: 'All rings',
    type: [RingEntity],
  })
  findAll(): RingEntity[] {
    return this.ringsService.findAll();
  }
}