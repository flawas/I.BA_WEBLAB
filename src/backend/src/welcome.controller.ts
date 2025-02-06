import { Controller, Get } from '@nestjs/common';
import {Public} from "./auth/decorators/public.decorator";
import {Roles} from "./roles/decorators/roles.decorator";
import {Role} from "./roles/roles.enum";

@Public()
@Controller('')
@Roles(Role.Admin)
export class WelcomeController {
    @Get()
    getWelcomeMessage(): string {
        return `Welcome to the Technologies API! For more information, visit the <a href='/api'>API documentation</a>`;
    }
}