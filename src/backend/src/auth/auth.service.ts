import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordsService } from "../passwords/passwords.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordsService,
  ) {}

  async signIn(username: string, plainTextPassword: string) {
    const user = await this.usersService.findOneByUsername(username);

    if(await this.passwordService.compare(plainTextPassword, user.password)){
      const payload = { username: user.username, sub: user._id, roles: user.roles };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else{
      throw new UnauthorizedException();
    }
  }
}
