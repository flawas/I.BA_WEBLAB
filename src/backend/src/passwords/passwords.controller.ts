import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PasswordsService } from './passwords.service';
import {CreatePasswordsDto} from "./dto/create-passwords.dto";
import {ComparePasswordsDto} from "./dto/compare-passwords.dto";

@ApiBearerAuth()
@ApiTags('passwords')
@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Post('hash')
  @ApiOperation({ summary: 'Generate hashed password' })
  @ApiResponse({ status: 201, description: 'Hashed password created' })
  async create(@Body() createPasswordsDto: CreatePasswordsDto): Promise<string> {
    return this.passwordsService.create(createPasswordsDto);
  }

  @Post('compare')
  @ApiOperation({ summary: 'Compare hashed password' })
  @ApiResponse({ status: 200, description: 'Password compared' })
  async compare(@Body() comparePasswordsDto: ComparePasswordsDto): Promise<boolean> {
      return this.passwordsService.compare(comparePasswordsDto.plainTextPassword, comparePasswordsDto.hashedPassword);
  }
}