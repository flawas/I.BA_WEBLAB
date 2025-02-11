import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CategoriesEntity} from './entities/categories.entity';
import {CreateCategoriesDto} from './dto/create-categories.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UpdateCategoriesDto} from './dto/update-categories.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {TechnologiesEntity} from "../technologies/entities/technologies.entity";
import {LogService} from "../log/log.service";
import {Severity} from "../log/enums/severity.enum";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {ServiceName} from "../log/enums/serviceName.enum";

@ApiBearerAuth()
@Injectable()
export class CategoriesService {

  constructor(
      @InjectModel(CategoriesEntity.name) private readonly categoriesModel: Model<CategoriesEntity>,
      @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
      private logService: LogService
  ) {}

  async create(createRingsDto: CreateCategoriesDto): Promise<CategoriesEntity> {
    try {
      const dto = new this.categoriesModel(createRingsDto);
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.DEBUG, description: `Category with id ${dto._id} created` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return await dto.save();
    } catch (error) {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Error creating category` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error creating Category');
    }
  }

  async findOne(_id: string): Promise<CategoriesEntity> {
    const categoryEntity = await this.categoriesModel.findById(_id).exec();
    if (!categoryEntity) {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.WARN, description: `Category with id ${_id} not found during specific search` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new NotFoundException(`Category with id ${_id} not found`);
    }
    const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.DEBUG, description: `Category with id ${_id} found during sepcific search` } as CreateLogDto;
    await this.logService.create(createLogDto);
    return categoryEntity;
  }

  async findAll(): Promise<CategoriesEntity[]> {
    try {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.DEBUG, description: `Get all categories` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return await this.categoriesModel.find().exec();
    } catch (error) {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `No categories found: ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new NotFoundException('No categories found');
    }
  }

  async update(_id: string, updateRings: UpdateCategoriesDto): Promise<CategoriesEntity> {
    try {
      const categories = await this.categoriesModel.findByIdAndUpdate(_id, updateRings, { new: true }).exec();
      if (!categories) {
        const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Category with id ${_id} not found` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new NotFoundException(`Category with id ${_id} not found`);
      }
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.INFO, description: `Category with id ${_id} updated` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return categories;
    } catch (error) {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Error updating category ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error updating category');
    }
  }

  async delete(_id: string): Promise<CategoriesEntity> {
    try {
      // Check if any technology item has the same id in the fk_category field
      const relatedTechnologies = await this.technologiesModel.find({ fk_category: _id }).exec();
      if (relatedTechnologies.length > 0) {
        const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Cannot delete category with id ${_id} because it is referenced by technology items` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new InternalServerErrorException(`Cannot delete category with id ${_id} because it is referenced by technology items`);
      }

      // Proceed with the deletion if no related technology items are found
      const categories = await this.categoriesModel.findByIdAndDelete(_id).exec();
      if (!categories) {
        const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Category with id ${_id} not found` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new NotFoundException(`Category with id ${_id} not found`);
      }
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.INFO, description: `Category with id ${_id} deleted` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return categories;
    } catch (error) {
      const createLogDto = { service: ServiceName.CATEGORIES, severity: Severity.ERROR, description: `Error deleting category ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error deleting category');
    }
  }

}