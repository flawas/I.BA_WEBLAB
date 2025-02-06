import { Injectable, NotFoundException } from '@nestjs/common';
import { RingEntity } from './entities/ring.entity';
import { CreateRingsDto } from './dto/create-rings.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RingsService {
  private ringEntities: RingEntity[] = [];

  create(createRingsDto: CreateRingsDto): RingEntity {
    const dto = new RingEntity();
    dto.uuid = uuidv4();
    dto.name = createRingsDto.name;
    dto.description = createRingsDto.description;
    this.ringEntities.push(dto);
    console.log(`Ring with uuid ${dto.uuid} created`);
    return dto;
  }

  findOne(uuid: string): RingEntity {
    const ringEntity = this.ringEntities.find(ring => ring.uuid === uuid);
    if (!ringEntity) {
      console.error(`Ring with uuid ${uuid} not found during specific ring search`);
      throw new NotFoundException(`Ring with uuid ${uuid} not found`);
    }
    console.log(`Ring with uuid ${uuid} found`);
    return ringEntity;
  }

  findAll(): RingEntity[] {
    console.log('Get all rings');
    return this.ringEntities;
  }
}