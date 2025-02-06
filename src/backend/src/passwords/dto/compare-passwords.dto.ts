import { IsString } from 'class-validator';

export class ComparePasswordsDto {
    @IsString()
    readonly plainTextPassword: string;

    @IsString()
    readonly hashedPassword: string;
}
