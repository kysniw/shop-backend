import { User } from './users/user.entity';

export interface RequestWithUser extends Request {
  session: { userId?: number };
  currentUser: User | null;
}

export type orderStatus = 'pending' | 'completed' | 'cancelled';
