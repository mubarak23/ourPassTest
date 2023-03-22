import { IsNotEmpty } from '@nestjs/class-validator';
export class CategoryDto {
  id?: number;

  @IsNotEmpty()
  user_uuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  createdAt?: Date;
}
