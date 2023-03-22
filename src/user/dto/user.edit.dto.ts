import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class EditUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;
}
