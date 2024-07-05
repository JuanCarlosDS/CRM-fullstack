import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
    @ApiProperty({ example: 'House Practical' })
    @IsString()
    @MaxLength(500)
    name: string;

    @ApiProperty({ example: 'This is a great organization', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'https://housepractical.com', required: false })
    @IsString()
    @IsOptional()
    website?: string;

    @ApiProperty({ example: '+1 234 567 8900', required: false })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ example: 'info@my-organization.com', required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: '1234 Main St, Anytown, USA', required: false })
    @IsString()
    @IsOptional()
    address?: string;
}