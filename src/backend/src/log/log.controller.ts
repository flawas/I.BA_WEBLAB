import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LogService } from './log.service';
import {CreateLogDto} from "./dto/create-log.dto";
import { LogEntity } from './entities/log.entity';
import {Roles} from "../roles/decorators/roles.decorator";
import {Role} from "../roles/roles.enum";
import {Public} from "../auth/decorators/public.decorator";

@ApiBearerAuth()
@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOperation({ summary: 'Create log' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'log created', type: LogEntity })
  @Public()
  async create(@Request() req: Request, @Body() createLogDto: CreateLogDto): Promise<LogEntity> {
    return this.logService.create(req, createLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({
    status: 200,
    description: 'All logs',
    type: LogEntity,
  })
  @Roles(Role.Admin)
  findAll(@Request() req: Request): Promise<LogEntity[]> {
    return this.logService.findAll(req);
  }

  @Get('public')
  @ApiOperation({ summary: 'Get all public logs' })
  @ApiResponse({
    status: 200,
    description: 'All logs',
    type: LogEntity,
  })
  @Roles(Role.User, Role.Admin)
  findAllPublicLogs(@Request() req: Request): Promise<LogEntity[]> {
    return this.logService.findPublicLogs(req);
  }


}