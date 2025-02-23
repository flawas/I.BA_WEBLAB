import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags,} from '@nestjs/swagger';
import {CreateUsersDto} from "./dto/create-users.dto";
import {UsersService} from "./users.service";
import {UsersEntity} from "./entities/users.entity";
import {Public} from "../auth/decorators/public.decorator";
import {Roles} from "../roles/decorators/roles.decorator";
import {Role} from "../roles/roles.enum";


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 201, description: 'User created', type: UsersEntity })
    async create(@Request() req, @Body() createUsersDto: CreateUsersDto): Promise<UsersEntity> {
        return this.userService.create(req, createUsersDto);
    }

    @Roles(Role.Admin)
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Return all users',
        type: [UsersEntity],
    })
    findAll(@Request() req): Promise<UsersEntity[]> {
        return this.userService.findAll(req);
    }


    @Roles(Role.Admin)
    @Get(':username')
    @ApiOperation({ summary: 'Get a specific user by username' })
    @ApiResponse({
        status: 200,
        description: 'Return one user',
        type: UsersEntity,
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOneByUsername(@Request() req, @Param('username') username: string): Promise<UsersEntity> {
        return this.userService.findOneByUsername(req, username);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Return updated user',
        type: UsersEntity,
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    updateByUsername(@Request() req, @Param('id') id: string, @Body() createUsersDto: CreateUsersDto): Promise<UsersEntity> {
        return this.userService.updateUser(req, id, createUsersDto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific user by id' })
    @ApiResponse({
        status: 200,
        description: 'Return deleted user',
        type: UsersEntity,
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    deleteByUsername(@Request() req, @Param('id') id: string): Promise<UsersEntity> {
        return this.userService.deleteUser(req, id);
    }


}