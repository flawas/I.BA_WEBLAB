import { ApiProperty } from '@nestjs/swagger';
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class UsersEntity extends Document{

    @ApiProperty({
        example: 'JohnDoe',
        description: 'The name of the user'
    })
    @Prop({ required: true })
    username: string;

    @ApiProperty({
        example: 'myPassword',
        description: 'The password of the user'
    })
    @Prop({ required: true })
    password: string;

    @ApiProperty({
        example: 'johndoe@doemail.com',
        description: 'The mail of the user'
    })
    @Prop({ required: true })
    mail: string;

    @ApiProperty({
        example: 'Admin',
        description: 'The role of the user'
    })
    @Prop({ required: true })
    roles: string[];

    @ApiProperty({
        example: '2025-02-05T19:44:56.363Z',
        description: 'The date of registration of the user'
    })
    @Prop()
    creationDate: Date;

    @ApiProperty({
        example: '2025-02-05T19:44:56.363Z',
        description: 'The last update of the user'
    })
    @Prop()
    lastUpdate : Date;

}
export const UsersSchema = SchemaFactory.createForClass(UsersEntity);