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

  async signIn(username: string, plainTextPassword: string) {
    const user = await this.usersService.findOneByUsername(username);
    if(await this.passwordService.compare(plainTextPassword, user.password)){
      const payload = { username: user.username, sub: user._id, roles: user.roles };
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'User ' + username + ' signed in successfully' } as CreateLogDto;
      await this.logService.create(createLogDto);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else{
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.WARN, description: 'User ' + username + ' not signed in' } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new UnauthorizedException();
    }
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'JWT token successfully validated' } as CreateLogDto;
      await this.logService.create(createLogDto);
      return true;
    } catch (e) {
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.WARN, description: 'JWT token is not valid' } as CreateLogDto;
      await this.logService.create(createLogDto);
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
      const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'User is admin' } as CreateLogDto;
      await this.logService.create(createLogDto);
      return true;
    } else {
        const createLogDto = { service: ServiceName.AUTH, severity: Severity.DEBUG, description: 'User is not admin' } as CreateLogDto;
        await this.logService.create(createLogDto);
        return false;
    }

  }
}
