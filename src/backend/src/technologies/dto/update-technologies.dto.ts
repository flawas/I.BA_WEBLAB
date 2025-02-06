import { IsInt, IsString } from 'class-validator';

export class UpdateTechnologiesDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly fk_ring: string;

    @IsString()
    readonly fk_category: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly description_categorisation: string;
}
