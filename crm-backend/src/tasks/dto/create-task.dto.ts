import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: number;

    @IsNotEmpty()
    assignee: number;

    @IsOptional()
    description?: string;

    @IsOptional()
    status?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;
}