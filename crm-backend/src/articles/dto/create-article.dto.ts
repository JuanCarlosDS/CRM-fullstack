import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateArticleDto {
  @ApiProperty({ example: 'Article Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Article content ' })
  @IsNotEmpty()
  content: string;


  @ApiProperty({ example: true })
  @IsBoolean()
  published: boolean;

  author: User;
}
