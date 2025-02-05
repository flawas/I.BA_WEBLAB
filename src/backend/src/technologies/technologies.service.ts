import { Injectable } from '@nestjs/common';
import {TechnologiesEntity} from "./entities/technologies.entity";
import {CreateTechnologiesDto} from "./dto/create-technologies.dto";

@Injectable()
export class TechnologiesService {
  private readonly technologiesEntities: TechnologiesEntity[] = [];

  create(cat: CreateTechnologiesDto): TechnologiesEntity {
    this.technologiesEntities.push(cat);
    return cat;
  }

  findOne(id: number): TechnologiesEntity {
    return this.technologiesEntities[id];
  }
}
