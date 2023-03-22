import { IsNotEmpty } from '@nestjs/class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly emailAddress: string;

  @IsNotEmpty()
  readonly password: string;
}
