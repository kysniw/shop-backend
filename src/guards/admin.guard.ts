import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.isAdmin;
  }
}
