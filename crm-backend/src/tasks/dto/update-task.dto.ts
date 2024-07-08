import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({ example: true })
    @IsOptional()
    done?: boolean;
}
