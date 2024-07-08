import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Organization } from 'src/organizations/entities/organization.entity';
import { validateAndConvertOrgId } from 'src/utils/transformers/organizationId';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, user: User, organizationId: string): Promise<Product> {
    const organizationIdNumber = validateAndConvertOrgId(organizationId);

    createProductDto.user = user;
    createProductDto.organization = { id: organizationIdNumber } as Organization;
    
    const newProduct = this.productsRepository.save(
      this.productsRepository.create(createProductDto),
    );

    return newProduct;
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(fields: EntityCondition<Product>): Promise<NullableType<Product>> {
    return this.productsRepository.findOne({
      where: fields,
    });
  }

  update(id: Product['id'], payload: DeepPartial<Product>): Promise<Product> {
    console.log('payload :>> ', payload);
    return this.productsRepository.save(
      this.productsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async remove(id: number) {
    try {
      const result = await this.productsRepository.delete(id);
      if (result.affected === 0) {
        return { message: `Product with ID ${id} not found` };
      }
      return { message: `Product with ID ${id} successfully deleted` };
    } catch (error) {
      throw new Error(`Error deleting product with ID ${id}: ${error.message}`);
    }
  }
}
