import { ApiProperty } from '@nestjs/swagger';

export class TechnologiesEntity {

  @ApiProperty({
    example: '6ba4248f-ffb9-4ff1-8d18-847f4917e6c5',
    description: 'The id of the technology'
  })
  uuid: string;

  @ApiProperty({
    example: '2025-02-05T19:44:56.363Z',
    description: 'The date of registration of the technology'
  })
  date: Date;

  @ApiProperty({
    example: '2025-02-05T19:44:56.363Z',
    description: 'The last update of the technology'
  })
  lastUpdate : Date;

  @ApiProperty({
    example: 'Microsoft Entra ID',
    description: 'The name of the technology'
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the ring'
  })
  fk_ring: string;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the category'
  })
  fk_category: string;

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
