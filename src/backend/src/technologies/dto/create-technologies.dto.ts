import { IsInt, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly fk_ring: number;

  @IsInt()
  readonly fk_category: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly description_categorisation: string;
}
