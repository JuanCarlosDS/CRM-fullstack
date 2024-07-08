import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Product Description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 123.45 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  userId: User;

  user: User;
  // Uncomment the following lines if you want to include category in your DTO
  // @ApiProperty({ example: 1 })
  // @IsNotEmpty()
  // @IsNumber()
  // categoryId: number;

  @Validate(IsExist, ['Organization', 'id'], {
    message: 'Organization not exists',
  })
  organization: Organization;
}
