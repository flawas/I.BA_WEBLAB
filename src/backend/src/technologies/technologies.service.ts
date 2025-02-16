import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {TechnologiesEntity} from './entities/technologies.entity';
import {CreateTechnologiesDto} from './dto/create-technologies.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {UpdateTechnologiesDto} from "./dto/update-technologies.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Request} from "express";
import {AuthService} from "../auth/auth.service";
import {CategoriesService} from "../categories/categories.service";
import {ServiceName} from "../log/enums/serviceName.enum";
import {Severity} from "../log/enums/severity.enum";
import {CreateLogDto} from "../log/dto/create-log.dto";
import {LogService} from "../log/log.service";
import {RingsService} from "../ring/rings.service";

@ApiBearerAuth()
@Injectable()
export class TechnologiesService {

    constructor(
        @InjectModel(TechnologiesEntity.name) private readonly technologiesModel: Model<TechnologiesEntity>,
        private categoriesService: CategoriesService,
        private ringsService: RingsService,
        private logService: LogService,
        private authService: AuthService
    ) {
    }

    async create(request: Request, createTechnologiesDto: CreateTechnologiesDto): Promise<TechnologiesEntity> {
        try {

            // Check if the category exists
            const category = await this.categoriesService.findOne(request, createTechnologiesDto.fk_category);
            if (!category) {
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.ERROR,
                    description: `Technology not created because category  ${category} does not exists`,
                    public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                throw new NotFoundException(`Category with id ${createTechnologiesDto.fk_category} not found`);
            }

            // Check if the ring exists
            if (createTechnologiesDto.fk_ring != '') {
                const ring = await this.ringsService.findOne(request, createTechnologiesDto.fk_ring);
                if (!ring) {
                    const createLogDto = {
                        service: ServiceName.TECHNOLOGIES,
                        severity: Severity.ERROR,
                        description: `Technology not created because ring  ${ring} does not exists`, public: false
                    } as CreateLogDto;
                    await this.logService.create(request, createLogDto);
                    throw new NotFoundException(`Ring with id ${createTechnologiesDto.fk_ring} not found`);
                }
            }

            // Check if user is allowed to create a technology
            if (await this.authService.isAdmin(request)) {
                const dto = new this.technologiesModel(createTechnologiesDto);
                dto.creationDate = new Date();
                dto.lastUpdate = new Date();
                dto.name = createTechnologiesDto.name;
                dto.description = createTechnologiesDto.description;
                dto.fk_category = createTechnologiesDto.fk_category;
                dto.description_categorisation = createTechnologiesDto.description_categorisation;
                dto.fk_ring = createTechnologiesDto.fk_ring;

                if (dto.fk_ring === undefined || dto.fk_ring === '' || dto.description_categorisation === undefined || dto.description_categorisation === '') {
                    dto.published = false;
                }

                dto.published = createTechnologiesDto.published;
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.INFO,
                    description: `Technology with id ${dto._id} created`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                return dto.save();
            }
        } catch (error) {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.INFO,
                description: `Technology could not be created ${error} `, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new InternalServerErrorException('Technology could not be created');
        }
    }

    async findOne(request: Request, _id: string): Promise<TechnologiesEntity> {
        const technology = await this.technologiesModel.findById(_id).exec();
        try {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.DEBUG,
                description: `Technology found with id ${_id} `, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            return technology;
        } catch {
            console.error('No technologies found');
            throw new NotFoundException('No technologies found');
        }
    }

    async findAll(request: Request): Promise<TechnologiesEntity[]> {
        try {
            if (await this.authService.isAdmin(request)) {
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.DEBUG,
                    description: `Technologies found for admin`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                return this.technologiesModel.find().exec();
            } else {
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.ERROR,
                    description: `Technologies found for user`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                return this.technologiesModel.find({published: true}).exec();
            }
        } catch (error) {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.ERROR,
                description: `No technology found   ${error}`, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new NotFoundException('No technologies found');
        }
    }

    async update(request: Request, _id: string, updateTechnology: UpdateTechnologiesDto): Promise<TechnologiesEntity> {

        // Check if technology exists
        const technology = await this.technologiesModel.findById(_id).exec();
        if (!technology) {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.ERROR,
                description: `Technology with _id ${_id} not found during technology update`, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new NotFoundException(`Technology with _id ${_id} not found`);
        }

        // Check if user is allowed to update a technology
        if (await this.authService.isAdmin(request)) {
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

                // If the foreign keys are not set, the technology is not published
                if (technology.fk_ring === undefined || technology.fk_ring === '' || technology.fk_category === undefined || technology.fk_category === '') {
                    technology.published = false;
                    const createLogDto = {
                        service: ServiceName.TECHNOLOGIES,
                        severity: Severity.ERROR,
                        description: `Technology with _id ${_id} updated but not published`, public: false
                    } as CreateLogDto;
                    await this.logService.create(request, createLogDto);
                } else {
                    const createLogDto = {
                        service: ServiceName.TECHNOLOGIES,
                        severity: Severity.ERROR,
                        description: `Technology with _id ${_id} updated and published`, public: false
                    } as CreateLogDto;
                    await this.logService.create(request, createLogDto);
                }
                await this.technologiesModel.findByIdAndUpdate(_id, technology, {new: true}).exec();
                return technology;
            } catch (error) {
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.ERROR,
                    description: `Technology with _id ${_id} could not be updated`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                throw new Error(`Technology with _id ${_id} could not be updated`);
            }
        } else {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.ERROR,
                description: `Technology not updated due to insufficient privileges`, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new Error(`Technology with _id ${_id} could not be updated`);
        }
    }

    async delete(request: Request, _id: string): Promise<TechnologiesEntity> {
        const technology = await this.technologiesModel.findById(_id).exec();
        if (!technology) {
            const createLogDto = {
                service: ServiceName.TECHNOLOGIES,
                severity: Severity.ERROR,
                description: `Technology with _id ${_id} not found during technology deletion`, public: false
            } as CreateLogDto;
            await this.logService.create(request, createLogDto);
            throw new NotFoundException(`Technology with _id ${_id} not found`);
        }
        if (await this.authService.isAdmin(request)) {
            try {
                const technology = await this.technologiesModel.findByIdAndDelete(_id).exec();
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.INFO,
                    description: `Technology with _id ${_id} deleted`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                return technology;
            } catch (error) {
                const createLogDto = {
                    service: ServiceName.TECHNOLOGIES,
                    severity: Severity.INFO,
                    description: `Technology with _id ${_id} could not be deleted`, public: false
                } as CreateLogDto;
                await this.logService.create(request, createLogDto);
                throw new Error(`Technology with _id ${_id} could not be deleted`);
            }
        }
    }
}