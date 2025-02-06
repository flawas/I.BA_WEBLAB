import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RingEntity } from './entities/ring.entity';
import { CreateRingsDto } from './dto/create-rings.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRingsDto } from './dto/update-rings.dto';
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Injectable()
export class RingsService {

  constructor(
      @InjectModel(RingEntity.name) private readonly ringsModel: Model<RingEntity>,
  ) {}

  async create(createRingsDto: CreateRingsDto): Promise<RingEntity> {
    try {
      const dto = new this.ringsModel(createRingsDto);
      console.log(`Ring with id ${dto._id} created`);
      return await dto.save();
    } catch (error) {
      console.error('Error creating ring:', error);
      throw new InternalServerErrorException('Error creating ring');
    }
  }

  async findOne(_id: string): Promise<RingEntity> {
    const ringEntity = await this.ringsModel.findById(_id).exec();
    if (!ringEntity) {
      console.error(`Ring with id ${_id} not found during specific ring search`);
      throw new NotFoundException(`Ring with id ${_id} not found`);
    }
    console.log(`Ring with id ${_id} found`);
    return ringEntity;
  }

  async findAll(): Promise<RingEntity[]> {
    try {
      console.log('Get all rings');
      return await this.ringsModel.find().exec();
    } catch (error) {
      console.error('No rings found:', error);
      throw new NotFoundException('No rings found');
    }
  }

  async update(_id: string, updateRings: UpdateRingsDto): Promise<RingEntity> {
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

  async delete(_id: string): Promise<RingEntity> {
    try {
      const ring = await this.ringsModel.findByIdAndDelete(_id).exec();
      if (!ring) {
        throw new NotFoundException(`Ring with id ${_id} not found`);
      }
      console.log(`Ring with id ${_id} deleted`);
      return ring;
    } catch (error) {
      console.error('Error deleting ring:', error);
      throw new InternalServerErrorException('Error deleting ring');
    }
  }

}