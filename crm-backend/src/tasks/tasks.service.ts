import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeepPartial, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto, user: User) {
    createTaskDto.author = user.id as any;
    const newTask = this.tasksRepository.save(
      this.tasksRepository.create(createTaskDto as any),
      );
      
    return newTask;
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>> {
    return this.tasksRepository.findOne({ where: fields });
  }

  update(id: Task['id'], payload: DeepPartial<Task>): Promise<Task> {
    return this.tasksRepository.save(
      this.tasksRepository.create({
        id,
        ...payload,
      }),
    );
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
