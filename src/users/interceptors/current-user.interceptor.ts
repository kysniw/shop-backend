import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { RequestWithUser } from '../../interfaces';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const { userId } = request.session || {};

    const user = await this.usersService.findOne(userId);

    request.currentUser = user;
    return next.handle();
  }
}
