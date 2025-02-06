import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreatePasswordsDto} from './dto/create-passwords.dto';
import * as bcrypt from 'bcrypt';
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Injectable()
export class PasswordsService {

  async create(createPasswordsDto: CreatePasswordsDto): Promise<string> {
    try {
      const saltRounds = 15;
      const myPlaintextPassword = createPasswordsDto.plainTextPassword;
      console.log('Creating password hash');
      return await bcrypt.hash(myPlaintextPassword, saltRounds);
    } catch (error) {
      console.error('Error creating password hash', error);
      throw new InternalServerErrorException(error);
    }
  }

  async compare(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    console.log('Comparing password hash');
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }


}