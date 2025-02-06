import { Injectable, NotFoundException } from '@nestjs/common';
import { TechnologiesEntity } from './entities/technologies.entity';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {UpdateTechnologiesDto} from "./dto/update-technologies.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@ApiBearerAuth()
@Injectable()
export class TechnologiesService {

  constructor(
      @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
  ) {}

  async create(createTechnologiesDto: CreateTechnologiesDto): Promise<TechnologiesEntity> {
    try{
      const dto = new this.technologiesModel(createTechnologiesDto);
      dto.creationDate = new Date();
      dto.lastUpdate = new Date();
      dto.name = createTechnologiesDto.name;
      dto.description = createTechnologiesDto.description;
      dto.fk_category = createTechnologiesDto.fk_category;
      dto.description_categorisation = createTechnologiesDto.description_categorisation;
      dto.fk_ring = createTechnologiesDto.fk_ring;
      dto.published = false;
      console.log(`Technology with _id ${dto._id} created`);
      return dto.save();
    } catch (error) {
      console.error('Technology could not be created');
      throw new Error('Technology could not be created');
    }
  }

  async findOne(_id: string): Promise<TechnologiesEntity> {
    const technology = await this.technologiesModel.findById(_id).exec();
    try{
      console.log(`Technology with _id ${_id} found`);
      return technology;
    } catch {
        console.error('No technologies found');
        throw new NotFoundException('No technologies found');
    }
  }

  findAll(): Promise<TechnologiesEntity[]> {
    try{
      console.log('Get all technologies');
      return this.technologiesModel.find().exec();
    } catch (error) {
      console.error('No technologies found');
      throw new NotFoundException('No technologies found');
    }
  }

  async update(_id: string, updateTechnology: UpdateTechnologiesDto): Promise<TechnologiesEntity> {
    const technology = await this.technologiesModel.findById(_id).exec();
    if (!technology) {
      console.log(`Technology with _id ${_id} not found during technology update`);
      throw new NotFoundException(`Technology with _id ${_id} not found`);
    }
    try {
      technology.name = updateTechnology.name;
      technology.description = updateTechnology.description;
      technology.description_categorisation = updateTechnology.description_categorisation;

      // Update the last update date
      technology.lastUpdate = new Date();

      technology.published = updateTechnology.published;

      // Check if the foreign keys are set
      technology.fk_ring = updateTechnology.fk_ring;
      technology.fk_category = updateTechnology.fk_category;
      if (technology.fk_ring === undefined || technology.fk_ring === ''
          || technology.fk_category === undefined || technology.fk_category === '') {
        technology.published = false;
        console.log(`Technology with _id ${_id} updated but not published`);
      } else {
        console.log(`Technology with _id ${_id} updated and published`);
      }
      await this.technologiesModel.findByIdAndUpdate(_id, technology, { new: true }).exec();
      return technology;
    } catch (error) {
      console.error(`Technology with _id ${_id} could not be updated`);
      throw new Error(`Technology with _id ${_id} could not be updated`);
    }
  }

  async delete(_id: string): Promise<TechnologiesEntity> {
    const technology = await this.technologiesModel.findById(_id).exec();
    if (!technology) {
      console.error(`Technology with _id ${_id} not found during technology deletion`);
      throw new NotFoundException(`Technology with _id ${_id} not found`);
    }
    try {
      const technology = await this.technologiesModel.findByIdAndDelete(_id).exec();;
      console.log(`Technology with _id ${_id} deleted`);
      return technology;
    } catch (error) {
      console.error(`Technology with _id ${_id} could not be deleted`);
      throw new Error(`Technology with _id ${_id} could not be deleted`);
    }
  }
}