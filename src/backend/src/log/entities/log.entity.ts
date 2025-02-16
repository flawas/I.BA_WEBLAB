import { ApiProperty } from '@nestjs/swagger';
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Severity} from "../enums/severity.enum";
import {ServiceName} from "../enums/serviceName.enum";

@Schema()
export class LogEntity extends Document{

  @ApiProperty({
    example: ServiceName.AUTH,
    description: 'The source of the log',
    enum: ServiceName
  })
  @Prop({ type: String, enum: ServiceName })
  service: ServiceName;

  @ApiProperty({
    example: Severity.WARN,
    description: 'The severity of the log',
    enum: Severity
  })
  @Prop({ type: String, enum: Severity })
  severity: Severity;

  @ApiProperty({
    example: 'Auth Service denied the login for the user John Doe due to wrong credentials',
    description: 'The description of the log'
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: '2025-02-05T19:44:56.363Z',
    description: 'The date of log creation'
  })
  @Prop({ required: true })
  creationDate: Date;

  @ApiProperty({
    example: 'true',
    description: 'Should the log be displayed on the dashboard'
  })
  @Prop({ required: true })
  public: boolean;

  @ApiProperty({
    example: 'John Doe',
    description: 'The user that triggered the log'
  })
  @Prop({ required: false })
  user: string;

}
export const LogSchema = SchemaFactory.createForClass(LogEntity);