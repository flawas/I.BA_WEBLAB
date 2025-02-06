import { Controller, Get } from '@nestjs/common';
import {Public} from "./auth/decorators/public.decorator";

@Public()
@Controller('')
export class WelcomeController {
    @Get()
    getWelcomeMessage(): string {
        return `Welcome to the Technologies API! For more information, visit the <a href='/api'>API documentation</a>`;
    }
}