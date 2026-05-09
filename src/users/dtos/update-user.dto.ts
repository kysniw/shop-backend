import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  surname!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  password!: string;
}
