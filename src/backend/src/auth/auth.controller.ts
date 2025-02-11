import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('validate-token')
  validateToken(@Request() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token
    console.log(token);
    return this.authService.isTokenValid(token);
  }
}
