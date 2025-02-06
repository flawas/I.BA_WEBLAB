import { IsString } from 'class-validator';

export class CreatePasswordsDto {
  @IsString()
  readonly plainTextPassword: string;
}
