import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(name: string, surname: string, email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    return this.usersService.create(name, surname, email, hashedPassword);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('invalid credentials');
    }

    const [salt, hash] = user.password.split('.');
    const attemptHash = (await scrypt(password, salt, 32)) as Buffer;

    if (attemptHash.toString('hex') !== hash) {
      throw new BadRequestException('invalid credentials');
    }

    return user;
  }
}
