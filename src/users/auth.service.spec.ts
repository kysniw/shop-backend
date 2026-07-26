import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (
        name: string,
        surname: string,
        email: string,
        password: string,
      ) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          name,
          surname,
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp(
      'John',
      'Doe',
      'john.doe@example.com',
      'password',
    );

    expect(user.password).not.toBe('password');
    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signUp('John', 'Doe', 'john.doe@example.com', 'password');

    await expect(
      service.signUp('Jane', 'Doe', 'john.doe@example.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if sign in is called with an unused email', async () => {
    await expect(
      service.signIn('jane.doe@example.com', 'password'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signUp('John', 'Doe', 'john.doe@example.com', 'password');

    await expect(
      service.signIn('john.doe@example.com', 'wrong_password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signUp('John', 'Doe', 'john.doe@example.com', 'password');

    const user = await service.signIn('john.doe@example.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('john.doe@example.com');
  });
});
