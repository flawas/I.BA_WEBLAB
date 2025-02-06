import { Injectable, NotFoundException } from '@nestjs/common';
import { TechnologiesEntity } from './entities/technologies.entity';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { v4 as uuidv4 } from 'uuid';
import {ApiBearerAuth} from "@nestjs/swagger";
import {UpdateTechnologiesDto} from "./dto/update-technologies.dto";

@ApiBearerAuth()
@Injectable()
export class TechnologiesService {
  private technologiesEntities: TechnologiesEntity[] = [];

  create(createTechnologiesDto: CreateTechnologiesDto): TechnologiesEntity {
    try{
      const dto = new TechnologiesEntity();
      dto.uuid = uuidv4();
      dto.date = new Date();
      dto.lastUpdate = new Date();
      dto.name = createTechnologiesDto.name;
      dto.description = createTechnologiesDto.description;
      dto.fk_category = createTechnologiesDto.fk_category;
      dto.description_categorisation = createTechnologiesDto.description_categorisation;
      dto.fk_ring = createTechnologiesDto.fk_ring;
      this.technologiesEntities.push(dto);
      console.log(`Technology with uuid ${dto.uuid} created`);
      return dto;
    } catch (error) {
      console.error('Technology could not be created');
      throw new Error('Technology could not be created');
    }
  }

  findOne(uuid: string): TechnologiesEntity {
    try{
        if (this.technologiesEntities.length === 0) {
            console.error('No technologies found');
            throw new NotFoundException('No technologies found');
        }
      const technology = this.technologiesEntities.find(tech => tech.uuid === uuid);
      if (!technology) {
        console.error(`Technology with uuid ${uuid} not found`);
        throw new NotFoundException(`Technology with uuid ${uuid} not found`);
      }
      console.log(`Technology with uuid ${uuid} found`);
      return technology;
    } catch {
        console.error('No technologies found');
        throw new NotFoundException('No technologies found');
    }
  }

  findAll(): TechnologiesEntity[] {
    try{
        if (this.technologiesEntities.length === 0) {
            console.error('No technologies found');
            throw new NotFoundException('No technologies found');
        } else {
            console.log('Get all technologies');
            return this.technologiesEntities;
        }
    } catch {
        console.error('No technologies found');
        throw new NotFoundException('No technologies found');
    }
  }

  update(uuid: string, updateTechnology: UpdateTechnologiesDto): TechnologiesEntity {
    const technology = this.technologiesEntities.find(tech => tech.uuid === uuid);
    if (!technology) {
      console.log(`Technology with uuid ${uuid} not found during technology update`);
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    }
    try {
      technology.name = updateTechnology.name;
      technology.fk_ring = updateTechnology.fk_ring;
      technology.fk_category = updateTechnology.fk_category;
      technology.description = updateTechnology.description;
      technology.description_categorisation = updateTechnology.description_categorisation;
      technology.lastUpdate = new Date();
      console.log(`Technology with uuid ${uuid} updated`);
      return technology;
    } catch (error) {
      console.error(`Technology with uuid ${uuid} could not be updated`);
      throw new Error(`Technology with uuid ${uuid} could not be updated`);
    }
  }

  delete(uuid: string): TechnologiesEntity {
    const technology = this.technologiesEntities.find(tech => tech.uuid === uuid);
    if (!technology) {
      console.error(`Technology with uuid ${uuid} not found during technology deletion`);
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    }
    try {
      this.technologiesEntities = this.technologiesEntities.filter(tech => tech.uuid !== uuid);
      console.log(`Technology with uuid ${uuid} deleted`);
      return technology;
    } catch (error) {
      console.error(`Technology with uuid ${uuid} could not be deleted`);
      throw new Error(`Technology with uuid ${uuid} could not be deleted`);
    }
  }
}