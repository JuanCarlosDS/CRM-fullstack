import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateBookingDto {
    @ApiProperty({ example: '2024-08-10T11:00:00Z' })
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ example: 'Booking Title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ 
        example: { 
        id: 2, 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
          // include other properties as needed
        } 
    })
    @IsNotEmpty()
    assignee: User;

    @ApiProperty({ example: 'Task Description', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '2024-08-10T10:00:00Z' })
    @IsNotEmpty()
    @IsDateString()
    startTime: Date;
    
    @ApiProperty({ example: '2024-08-10T11:00:00Z' })
    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

    @ApiProperty({ 
        example: { 
        id: 3, 
        name: 'John Doe', 
        email: 'test1@example.com', 
          // include other properties as needed
        } 
    })
    user: User;

    @ApiProperty({ example: {
      "id": 1
      }
    })
    @IsNotEmpty()
    @Validate(IsExist, ['Organization', 'id'], {
      message: 'Organization not exists',
    })
    organization: Organization;
}
