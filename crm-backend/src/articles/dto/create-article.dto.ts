import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, Validate } from 'class-validator';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

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

  @Validate(IsExist, ['Organization', 'id'], {
    message: 'Organization not exists',
  })
  organization: Organization;
}
