import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordsService } from "../passwords/passwords.service";
import {LogService} from "../log/log.service";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {Severity} from "../log/enums/severity.enum";
import {ServiceName} from "../log/enums/serviceName.enum";
import {request, Request} from "express";

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private passwordService: PasswordsService,
      private logService: LogService
  ) {}

  async signIn(request: Request, username: string, plainTextPassword: string) {
    const user = await this.usersService.findOneByUsername(request, username);
    if(await this.passwordService.compare(request, plainTextPassword, user.password)){
      const payload = { username: user.username, sub: user._id, roles: user.roles, public: true};
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.INFO, description: 'User ' + username + ' signed in successfully', public: true } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else{
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.WARN, description: 'User ' + username + ' not signed in', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new UnauthorizedException();
    }
  }

  async isTokenValid(request: Request, token: string): Promise<boolean> {
    try {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'JWT token successfully validated', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return true;
    } catch (e) {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.WARN, description: 'JWT token is not valid', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return false;
    }
  }

  async isAdmin(request: Request): Promise<boolean>  {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;
    const isAdmin = decodedToken?.roles?.includes('admin');
    console.log('Get all technologies based on role:', isAdmin ? 'admin' : 'user');

    if(isAdmin) {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'User is admin', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return true;
    } else {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'User is not admin', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return false;
    }

  }
}