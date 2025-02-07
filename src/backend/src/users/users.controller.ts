import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
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
    async create(@Body() createUsersDto: CreateUsersDto): Promise<UsersEntity> {
        return this.userService.create(createUsersDto);
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
    findOneByUsername(@Param('username') username: string): Promise<UsersEntity> {
        return this.userService.findOneByUsername(username);
    }
}