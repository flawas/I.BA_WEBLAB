import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreatePasswordsDto} from './dto/create-passwords.dto';
import * as bcrypt from 'bcrypt';
import {ApiBearerAuth} from "@nestjs/swagger";
import {ServiceName} from "../log/enums/serviceName.enum";
import {Severity} from "../log/enums/severity.enum";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {LogService} from "../log/log.service";
import {Request} from "express";

@ApiBearerAuth()
@Injectable()
export class PasswordsService {

    constructor(
        private logService: LogService
    ) {}

  async create(request: Request, createPasswordsDto: CreatePasswordsDto): Promise<string> {
    try {
      const saltRounds = 15;
      const myPlaintextPassword = createPasswordsDto.plainTextPassword;
      const createLogDto = { service: ServiceName.PASSWORD, severity: Severity.DEBUG, description: 'Created password hash', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return await bcrypt.hash(myPlaintextPassword, saltRounds);
    } catch (error) {
      const createLogDto = { service: ServiceName.PASSWORD, severity: Severity.ERROR, description: `Error creating password hash ${error}`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new InternalServerErrorException(error);
    }
  }

  async compare(request: Request, plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    const createLogDto = { service: ServiceName.PASSWORD, severity: Severity.DEBUG, description: `Comparing password hash`, public: false } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }


}