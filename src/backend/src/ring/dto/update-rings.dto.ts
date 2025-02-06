import {IsString} from 'class-validator';

export class UpdateRingsDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;
}
