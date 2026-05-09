import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { userId } = request.session || {};

    if (!userId) {
      return false;
    }
    return true;
  }
}
