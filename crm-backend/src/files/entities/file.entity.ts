import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import appConfig from '../../config/app.config';
import { AppConfig } from 'src/config/config.type';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'eee58722-8a1c-42c5-8d0b-68d0ce5a8cf5' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  @ApiProperty({ example: 'https://crm-fullstack.s3.us-east-2.amazonaws.com/d0428142a9361e893a800.png' })
  path: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = (appConfig() as AppConfig).backendDomain + this.path;
    }
  }
}
