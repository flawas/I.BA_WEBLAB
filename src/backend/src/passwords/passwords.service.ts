import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePasswordsDto } from './dto/create-passwords.dto';
import * as bcrypt from 'bcrypt';
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Injectable()
export class PasswordsService {


  async create(createPasswordsDto: CreatePasswordsDto): Promise<string> {
    try {
      const saltRounds = 10;
      const myPlaintextPassword = createPasswordsDto.plainTextPassword;
      const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
      return hash;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async compare(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }


}