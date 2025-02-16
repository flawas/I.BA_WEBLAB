import {IsBoolean, IsEnum, IsString} from 'class-validator';
import {Severity} from "../enums/severity.enum";
import {ServiceName} from "../enums/serviceName.enum";


export class CreateLogDto {

  @IsEnum(ServiceName)
  readonly service: ServiceName;

  @IsEnum(Severity)
  readonly severity: Severity;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly public: boolean;

  @IsString()
  readonly user: string;

}
