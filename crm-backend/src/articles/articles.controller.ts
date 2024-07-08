import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { CurrentUser } from 'src/decorators/user/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { StandardPaginationResultType } from 'src/utils/types/standard-pagination-result.type';
import { standardPagination } from 'src/utils/standard-pagination';
import { Article } from './entities/article.entity';

@Controller({
  path: 'articles',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('Articles')
@ApiBearerAuth()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createArticleDto: CreateArticleDto, 
  @CurrentUser() user: User,
  @Req() req: Request
  ) {
    const organizationId = req['organizationId'];
    return this.articlesService.create(createArticleDto, user, organizationId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<StandardPaginationResultType<Article>> {
    if (limit > 50) {
      limit = 50;
    }

    return standardPagination(
      await this.articlesService.findManyWithPagination({
        page,
        limit,
        offset,
      }),
      await this.articlesService.standardCount(),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne({ id: +id });
  }

  @Patch(':id')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
