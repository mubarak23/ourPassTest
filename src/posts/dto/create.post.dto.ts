import { IsNotEmpty } from '@nestjs/class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
