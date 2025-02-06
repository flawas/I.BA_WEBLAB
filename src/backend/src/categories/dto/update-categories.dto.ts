import {IsString} from 'class-validator';

export class UpdateCategoriesDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;
}
