import { IsNotEmpty, IsEmail } from '@nestjs/class-validator';

export class UserDto {
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdAt?: Date;
}
