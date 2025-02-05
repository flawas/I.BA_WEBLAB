import {Injectable, NotFoundException} from '@nestjs/common';
import { CategoriesEntity } from './entities/categories.entity';
import {CreateCategoriesDto} from './dto/create-technologies.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  private readonly categoriesEntities: CategoriesEntity[] = [];

  create(createCategoriesDto: CreateCategoriesDto): CategoriesEntity {
    const dto = new CategoriesEntity();
    dto.uuid = uuidv4();
    dto.name = createCategoriesDto.name;
    dto.description = createCategoriesDto.description;
    this.categoriesEntities.push(dto);
    return dto;
  }

  findOne(uuid: string): CategoriesEntity {
    const technology = this.categoriesEntities.find(tech => tech.uuid === uuid);
    if (!technology) {
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    }
    return technology;
  }

  findAll(): CategoriesEntity[] {
    return this.categoriesEntities;
  }
}