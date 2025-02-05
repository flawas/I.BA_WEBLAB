import {Injectable, NotFoundException} from '@nestjs/common';
import { RingEntity } from './entities/ring.entity';
import { CreateRingsDto } from './dto/create-rings.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RingsService {
  private readonly ringEntities: RingEntity[] = [];

  create(createCategoriesDto: CreateRingsDto): RingEntity {
    const dto = new RingEntity();
    dto.uuid = uuidv4();
    dto.name = createCategoriesDto.name;
    dto.description = createCategoriesDto.description;
    this.ringEntities.push(dto);
    return dto;
  }

  findOne(uuid: string): RingEntity {
    const technology = this.ringEntities.find(tech => tech.uuid === uuid);
    if (!technology) {
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    }
    return technology;
  }

  findAll(): RingEntity[] {
    return this.ringEntities;
  }
}