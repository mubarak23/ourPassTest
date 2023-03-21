import { IsNotEmpty } from '@nestjs/class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly emalAddress: string;

  @IsNotEmpty()
  readonly password: string;
}
