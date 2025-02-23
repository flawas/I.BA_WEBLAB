import {IsEmail, IsInt, IsString} from 'class-validator';

export class UpdateUsersDto {

    @IsEmail()
    readonly mail: string;

    @IsString()
    readonly roles: string[];
}
