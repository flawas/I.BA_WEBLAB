import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './decorators/roles.decorator';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            console.log('No roles required');
            return true;
        }
        console.log('Required roles:', requiredRoles);
        const request = context.switchToHttp().getRequest();
        const bearerToken = request.headers.authorization?.split(' ')[1];
        const user = this.jwtService.decode(bearerToken);
        console.log('User roles:', user.roles);
        return requiredRoles.some((role) => user.roles?.includes(role));
    }

}