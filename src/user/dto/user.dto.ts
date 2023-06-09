import { IsNotEmpty, IsEmail } from '@nestjs/class-validator';

export class UserDto {
  @IsNotEmpty()
  user_uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  createdAt?: Date;
}
