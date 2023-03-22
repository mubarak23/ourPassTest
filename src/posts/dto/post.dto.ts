import { IsNotEmpty } from '@nestjs/class-validator';
export class PostDto {
  id?: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  user_uuid: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  createdAt?: Date;
}
