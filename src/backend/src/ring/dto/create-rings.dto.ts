import {IsInt, IsString} from 'class-validator';

export class CreateRingsDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsInt()
    readonly level: number;
}
