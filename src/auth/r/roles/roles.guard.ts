import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [ context.getHandler(), context.getClass()]
    )
    const user = context.switchToHttp().getRequest().user
    log(requiredRoles)
    const hasrquiredRole = requiredRoles.some(role => user.role === role)
    return hasrquiredRole
  }
}

