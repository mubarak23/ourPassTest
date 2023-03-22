import { IsNotEmpty } from '@nestjs/class-validator';
export class CategoryDto {
  @IsNotEmpty()
  user_uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  createdAt?: Date;
}
