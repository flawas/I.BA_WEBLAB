import { ApiProperty } from '@nestjs/swagger';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class TechnologiesEntity extends Document{

  @ApiProperty({
    example: '2025-02-05T19:44:56.363Z',
    description: 'The date of registration of the technology'
  })
  @Prop()
  creationDate: Date;

  @ApiProperty({
    example: '2025-02-05T19:44:56.363Z',
    description: 'The last update of the technology'
  })
  @Prop()
  lastUpdate : Date;

  @ApiProperty({
    example: 'Microsoft Entra ID',
    description: 'The name of the technology'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the ring'
  })
  @Prop()
  fk_ring: string;

  @ApiProperty({
    example: '1',
    description: 'The foreign key of the category'
  })
  @Prop()
  fk_category: string;

  @ApiProperty({
    example: 'A product to manage users in the Microsoft cloud environemnt',
    description: 'The description of the technology'
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The description of the categorisation',
  })
  @Prop()
  description_categorisation: string;

  @ApiProperty({
    example: 'true',
    description: 'The published state of the technology, Default: false'
  })
  @Prop()
  published: boolean
}

export const TechnologiesSchema = SchemaFactory.createForClass(TechnologiesEntity);