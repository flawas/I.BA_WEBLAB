import { ApiProperty } from '@nestjs/swagger';
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class CategoriesEntity extends Document{

  @ApiProperty({
    example: 'Database',
    description: 'The name of the category'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'The database is used to structured store data',
    description: 'The description of the category'
  })
  @Prop()
  description: string;

}
export const CategoriesSchema = SchemaFactory.createForClass(CategoriesEntity);