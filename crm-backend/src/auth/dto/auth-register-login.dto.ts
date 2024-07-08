import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { Organization } from 'src/organizations/entities/organization.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @ApiProperty({ example: 'secret' })
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @Validate(IsExist, ['Organization', 'id'], {
    message: 'Organization not exists',
  })
  organization: Organization;
}
