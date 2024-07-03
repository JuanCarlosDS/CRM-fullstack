import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
    @IsString()
    @MaxLength(500)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    website?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    address?: string;
}