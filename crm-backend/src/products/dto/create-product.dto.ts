import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

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
}
