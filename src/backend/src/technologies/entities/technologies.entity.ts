import { ApiProperty } from '@nestjs/swagger';

export class TechnologiesEntity {
  /**
   * The name of the Cat
   * @example Kitty
   */
  @ApiProperty({
    example: 'Microsoft Entra ID',
    description: 'The name of the technology'
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the ring'
  })
  fk_ring: number;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the category'
  })
  fk_category: number;

  @ApiProperty({
    example: 'A product to manage users in the Microsoft cloud environemnt',
    description: 'The description of the technology'
  })
  description: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The description of the categorisation',
  })
  description_categorisation: string;
}
