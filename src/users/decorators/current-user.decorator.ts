import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../../interfaces';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.currentUser;
  },
);
