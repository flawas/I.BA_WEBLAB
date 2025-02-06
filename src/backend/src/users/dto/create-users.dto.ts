import {IsEmail, IsInt, IsString} from 'class-validator';

export class CreateUsersDto {

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;
}
