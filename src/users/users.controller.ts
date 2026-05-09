import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserMiniDto } from './dtos/user-mini.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/auth/signup')
  @Serialize(UserMiniDto)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(
      body.email,
      body.password,
      body.name,
      body.surname,
    );
  }

  @Post('/auth/signin')
  @Serialize(UserMiniDto)
  async signIn(
    @Body() body: SignInUserDto,
    @Session() session: { userId?: number },
  ) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('/auth/signout')
  signOut(@Session() session: { userId?: number }) {
    session.userId = undefined;
  }

  @Get('/auth/whoami')
  @Serialize(UserMiniDto)
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/users/:id')
  @Serialize(UserDto)
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/users')
  @Serialize(UserMiniDto)
  findAll(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/users/:id')
  @Serialize(UserDto)
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/users/:id')
  @Serialize(UserMiniDto)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
