import {Injectable, NotFoundException} from '@nestjs/common';
import { TechnologiesEntity } from './entities/technologies.entity';
import { RingEntity } from '../ring/entities/ring.entity';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TechnologiesService {
  private readonly technologiesEntities: TechnologiesEntity[] = [];
  private readonly ringEntities: RingEntity[] = [];

  create(createTechnologiesDto: CreateTechnologiesDto): TechnologiesEntity {
    const dto = new TechnologiesEntity();
    dto.uuid = uuidv4();
    dto.date = new Date();
    dto.name = createTechnologiesDto.name;
    dto.description = createTechnologiesDto.description;
    dto.fk_category = createTechnologiesDto.fk_category;
    dto.description_categorisation = createTechnologiesDto.description_categorisation;
    dto.fk_ring = createTechnologiesDto.fk_ring;
    this.technologiesEntities.push(dto);
    return dto;
  }

  findOne(uuid: string): TechnologiesEntity {
    const technology = this.technologiesEntities.find(tech => tech.uuid === uuid);
    if (!technology) {
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    }
    return technology;
  }

  findAll(): TechnologiesEntity[] {
    return this.technologiesEntities;
  }
}