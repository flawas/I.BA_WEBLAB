import { ApiProperty } from '@nestjs/swagger';

export class CategoriesEntity {

  @ApiProperty({
    example: '6ba4248f-ffb9-4ff1-8d18-847f4917e6c5',
    description: 'The id of the category'
  })
  uuid: string;

  @ApiProperty({
    example: 'Database',
    description: 'The type of the category'
  })
  name: string;

  @ApiProperty({
    example: 'The database is used to strucutred store data',
    description: 'The description of the category'
  })
  description: string;

}
