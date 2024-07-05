import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Organization } from 'src/organizations/entities/organization.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Task Title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    author: number;

    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    assignee: number;

    @ApiProperty({ example: 'Task Description', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'Task Status', required: false })
    @IsOptional()
    status?: string;

    @ApiProperty({ example: '2022-12-31', required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: Date;

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
