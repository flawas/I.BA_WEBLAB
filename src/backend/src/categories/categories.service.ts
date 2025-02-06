import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CategoriesEntity } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {TechnologiesEntity} from "../technologies/entities/technologies.entity";

@ApiBearerAuth()
@Injectable()
export class CategoriesService {

  constructor(
      @InjectModel(CategoriesEntity.name) private readonly ringsModel: Model<CategoriesEntity>,
      @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
  ) {}

  async create(createRingsDto: CreateCategoriesDto): Promise<CategoriesEntity> {
    try {
      const dto = new this.ringsModel(createRingsDto);
      console.log(`Ring with id ${dto._id} created`);
      return await dto.save();
    } catch (error) {
      console.error('Error creating ring:', error);
      throw new InternalServerErrorException('Error creating ring');
    }
  }

  async findOne(_id: string): Promise<CategoriesEntity> {
    const ringEntity = await this.ringsModel.findById(_id).exec();
    if (!ringEntity) {
      console.error(`Ring with id ${_id} not found during specific ring search`);
      throw new NotFoundException(`Ring with id ${_id} not found`);
    }
    console.log(`Ring with id ${_id} found`);
    return ringEntity;
  }

  async findAll(): Promise<CategoriesEntity[]> {
    try {
      console.log('Get all rings');
      return await this.ringsModel.find().exec();
    } catch (error) {
      console.error('No rings found:', error);
      throw new NotFoundException('No rings found');
    }
  }

  async update(_id: string, updateRings: UpdateCategoriesDto): Promise<CategoriesEntity> {
    try {
      const rings = await this.ringsModel.findByIdAndUpdate(_id, updateRings, { new: true }).exec();
      if (!rings) {
        throw new NotFoundException(`Ring with id ${_id} not found`);
      }
      return rings;
    } catch (error) {
      console.error('Error updating ring:', error);
      throw new InternalServerErrorException('Error updating ring');
    }
  }

  async delete(_id: string): Promise<CategoriesEntity> {
    try {
      // Check if any technology item has the same id in the fk_category field
      const relatedTechnologies = await this.technologiesModel.find({ fk_category: _id }).exec();
      if (relatedTechnologies.length > 0) {
        throw new InternalServerErrorException(`Cannot delete category with id ${_id} because it is referenced by technology items`);
      }

      // Proceed with the deletion if no related technology items are found
      const ring = await this.ringsModel.findByIdAndDelete(_id).exec();
      if (!ring) {
        throw new NotFoundException(`Category with id ${_id} not found`);
      }
      console.log(`Category with id ${_id} deleted`);
      return ring;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new InternalServerErrorException('Error deleting category');
    }
  }

}