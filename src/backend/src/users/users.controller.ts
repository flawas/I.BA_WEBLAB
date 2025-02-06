import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {CreateUsersDto} from "./dto/create-users.dto";
import {UsersService} from "./users.service";
import {UsersEntity} from "./entities/users.entity";
import {Public} from "../auth/decorators/public.decorator";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 201, description: 'User created', type: UsersEntity })
    async create(@Body() createUsersDto: CreateUsersDto): Promise<UsersEntity> {
        return this.userService.create(createUsersDto);
    }

    @Get(':username')
    @ApiOperation({ summary: 'Get a specific user by username' })
    @ApiResponse({
        status: 200,
        description: 'Return one user',
        type: UsersEntity,
    })
    findOneByUsername(@Param('username') username: string): Promise<UsersEntity> {
        return this.userService.findOneByUsername(username);
    }
}