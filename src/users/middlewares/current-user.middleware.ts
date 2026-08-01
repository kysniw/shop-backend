import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestWithUser } from '../../interfaces';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      req.currentUser = await this.userService.findOne(userId);
    }
    next();
  }
}
