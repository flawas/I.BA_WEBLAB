import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RingEntity } from './entities/ring.entity';
import { CreateRingsDto } from './dto/create-rings.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRingsDto } from './dto/update-rings.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {TechnologiesEntity} from "../technologies/entities/technologies.entity";
import {ServiceName} from "../log/enums/serviceName.enum";
import {Severity} from "../log/enums/severity.enum";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {LogService} from "../log/log.service";

@ApiBearerAuth()
@Injectable()
export class RingsService {

  constructor(
      @InjectModel(RingEntity.name) private readonly ringsModel: Model<RingEntity>,
      @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
      private logService: LogService
  ) {}

  async create(createRingsDto: CreateRingsDto): Promise<RingEntity> {
    try {
      const dto = new this.ringsModel(createRingsDto);
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.DEBUG, description: `Ring with id ${dto._id} created` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return await dto.save();
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `'Error creating ring: ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error creating ring');
    }
  }

  async findOne(_id: string): Promise<RingEntity> {
    const ringEntity = await this.ringsModel.findById(_id).exec();
    if (!ringEntity) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.WARN, description: `Ring with id ${_id} not found during specific ring search` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new NotFoundException(`Ring with id ${_id} not found`);
    }
    const createLogDto = { service: ServiceName.RINGS, severity: Severity.DEBUG, description: `Ring with id ${_id} found` } as CreateLogDto;
    await this.logService.create(createLogDto);
    return ringEntity;
  }

  async findAll(): Promise<RingEntity[]> {
    try {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.DEBUG, description: 'Get all rings' } as CreateLogDto;
      await this.logService.create(createLogDto);
      return await this.ringsModel.find().exec();
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.WARN, description: `No rings found: ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new NotFoundException('No rings found');
    }
  }

  async update(_id: string, updateRings: UpdateRingsDto): Promise<RingEntity> {
    try {
      const rings = await this.ringsModel.findByIdAndUpdate(_id, updateRings, { new: true }).exec();
      if (!rings) {
        const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with id ${_id} not found` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new NotFoundException(`Ring with id ${_id} not found`);
      }
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Ring with id ${_id} updated` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return rings;
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Error updating ring ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error updating ring');
    }
  }

  async delete(_id: string): Promise<RingEntity> {
    try {
      // Check if any technology item has the same id in the fk_ring field
      const relatedTechnologies = await this.technologiesModel.find({ fk_ring: _id }).exec();
      if (relatedTechnologies.length > 0) {
        const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Cannot delete ring with id ${_id} because it is referenced by technology items` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new InternalServerErrorException(`Cannot delete ring with id ${_id} because it is referenced by technology items`);
      }

      // Proceed with the deletion if no related technology items are found
      const ring = await this.ringsModel.findByIdAndDelete(_id).exec();
      if (!ring) {
        const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with id ${_id} not found` } as CreateLogDto;
        await this.logService.create(createLogDto);
        throw new NotFoundException(`Ring with id ${_id} not found`);
      }
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Ring with id ${_id} deleted` } as CreateLogDto;
      await this.logService.create(createLogDto);
      return ring;
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Error deleting ring: ${error}` } as CreateLogDto;
      await this.logService.create(createLogDto);
      throw new InternalServerErrorException('Error deleting ring');
    }
  }
}