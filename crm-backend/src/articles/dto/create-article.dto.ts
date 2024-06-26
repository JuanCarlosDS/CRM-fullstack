import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsBoolean()
  published: boolean;

  author: User;
}
