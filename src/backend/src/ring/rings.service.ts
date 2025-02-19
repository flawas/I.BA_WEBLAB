import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RingsEntity } from './entities/ringsEntity';
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
import {Request} from "express";

@ApiBearerAuth()
@Injectable()
export class RingsService {

  constructor(
      @InjectModel(RingsEntity.name) private readonly ringsModel: Model<RingsEntity>,
      @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
      private logService: LogService
  ) {}

  async create(request: Request, createRingsDto: CreateRingsDto): Promise<RingsEntity> {
    try {
        const dto = new this.ringsModel(createRingsDto);
        const existingRing = await this.ringsModel.findOne({ level: createRingsDto.level }).exec();
        if (await existingRing) {
            const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with level ${dto.level} already exists`, public: true } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new InternalServerErrorException(`Ring with level ${createRingsDto.level} already exists`);
        }

      const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Ring with id ${dto._id} created`, public: true } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return await dto.save();
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `'Error creating ring: ${error}`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new InternalServerErrorException('Error creating ring');
    }
  }

  async findOne(request: Request, _id: string): Promise<RingsEntity> {
    const ringEntity = await this.ringsModel.findById(_id).exec();
    if (!ringEntity) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.WARN, description: `Ring with id ${_id} not found during specific ring search`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new NotFoundException(`Ring with id ${_id} not found`);
    }
    const createLogDto = { service: ServiceName.RINGS, severity: Severity.DEBUG, description: `Ring with id ${_id} found`, public: false } as CreateLogDto;
    await this.logService.create(request, createLogDto);
    return ringEntity;
  }

  async findAll(request: Request): Promise<RingsEntity[]> {
    try {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.DEBUG, description: 'Get all rings', public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return await this.ringsModel.find().exec();
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.WARN, description: `No rings found: ${error}`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new NotFoundException('No rings found');
    }
  }

    async update(request: Request, _id: string, updateRings: UpdateRingsDto): Promise<RingsEntity> {
        try {
            // Check if a ring with the same level already exists
            const existingRing = await this.ringsModel.findOne({ level: updateRings.level }).exec();
            console.log(existingRing);
            if (existingRing && existingRing._id.toString() !== _id) {
                const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with level ${updateRings.level} already exists`, public: true } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                throw new InternalServerErrorException(`Ring with level ${updateRings.level} already exists`);
            }

            const rings = await this.ringsModel.findByIdAndUpdate(_id, updateRings, { new: true }).exec();
            if (!rings) {
                const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with id ${_id} not found`, public: false } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                throw new NotFoundException(`Ring with id ${_id} not found`);
            }

            const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Ring with id ${_id} updated`, public: false } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            return rings;
        } catch (error) {
            const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Error updating ring ${error}`, public: false } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new InternalServerErrorException('Error updating ring');
        }
    }

  async delete(request: Request, _id: string): Promise<RingsEntity> {
    try {
      // Check if any technology item has the same id in the fk_ring field
      const relatedTechnologies = await this.technologiesModel.find({ fk_ring: _id }).exec();
      if (relatedTechnologies.length > 0) {
        const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Cannot delete ring with id ${_id} because it is referenced by technology items`, public: false } as CreateLogDto;
        await this.logService.create(request, createLogDto);
        throw new InternalServerErrorException(`Cannot delete ring with id ${_id} because it is referenced by technology items`);
      }

      // Proceed with the deletion if no related technology items are found
      const ring = await this.ringsModel.findByIdAndDelete(_id).exec();
      if (!ring) {
        const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Ring with id ${_id} not found`, public: false } as CreateLogDto;
        await this.logService.create(request, createLogDto);
        throw new NotFoundException(`Ring with id ${_id} not found`);
      }
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.INFO, description: `Ring with id ${_id} deleted`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      return ring;
    } catch (error) {
      const createLogDto = { service: ServiceName.RINGS, severity: Severity.ERROR, description: `Error deleting ring: ${error}`, public: false } as CreateLogDto;
      await this.logService.create(request, createLogDto);
      throw new InternalServerErrorException('Error deleting ring');
    }
  }
}