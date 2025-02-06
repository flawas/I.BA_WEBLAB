import { ApiProperty } from '@nestjs/swagger';
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class RingEntity extends Document{

  @ApiProperty({
    example: 'Level 0',
    description: 'The name of the ring'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'The level 0 is the first level of the ring',
    description: 'The level of the ring'
  })
  @Prop()
  description: string;

}
export const RingsSchema = SchemaFactory.createForClass(RingEntity);