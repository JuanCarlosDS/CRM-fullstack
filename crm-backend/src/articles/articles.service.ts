import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}
  create(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    createArticleDto.author = user.id as any;
    const newArticle = this.articlesRepository.save(
      this.articlesRepository.create(createArticleDto),
    );

    return newArticle;
  }

  findAll() {
    return this.articlesRepository.find();
  }

  findOne(fields: EntityCondition<Article>): Promise<NullableType<Article>> {
    return this.articlesRepository.findOne({
      where: fields,
    });
  }

  update(id: Article['id'], payload: DeepPartial<Article>): Promise<Article> {
    console.log('payload :>> ', payload);
    return this.articlesRepository.save(
      this.articlesRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async remove(id: number) {
    try {
      const result = await this.articlesRepository.delete(id);
      if (result.affected === 0) {
        return { message: `Article with ID ${id} not found` };
      }
      return { message: `Article with ID ${id} successfully deleted` };
    } catch (error) {
      throw new Error(`Error deleting article with ID ${id}: ${error.message}`);
    }
  }
}
