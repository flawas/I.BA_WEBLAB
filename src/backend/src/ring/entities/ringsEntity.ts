import {ApiProperty} from '@nestjs/swagger';
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class RingsEntity extends Document {

    @ApiProperty({
        example: 'Level 0',
        description: 'The name of the ring'
    })
    @Prop({required: true})
    name: string;

    @ApiProperty({
        example: 'The level 0 is the first level of the ring',
        description: 'The description of the ring'
    })
    @Prop()
    description: string;

    @ApiProperty({
        example: 0,
        description: 'The level of the ring'
    })
    @Prop({type: Number, required: true})
    level: number;

}

export const RingsSchema = SchemaFactory.createForClass(RingsEntity);