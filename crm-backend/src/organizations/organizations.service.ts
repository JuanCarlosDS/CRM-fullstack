import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization = this.organizationsRepository.save(
      this.organizationsRepository.create(createOrganizationDto),
      );
      
    return newOrganization;
  }

  findAll() {
    return this.organizationsRepository.find();
  }

  findOne(fields: EntityCondition<Organization>): Promise<NullableType<Organization>> {
    return this.organizationsRepository.findOne({ where: fields });
  }


  update(id: Organization['id'], payload: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationsRepository.save(
      this.organizationsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  remove(id: number) {
    return this.organizationsRepository.delete(id);
  }
}
