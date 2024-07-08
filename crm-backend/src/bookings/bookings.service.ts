import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { validateAndConvertOrgId } from 'src/utils/transformers/organizationId';
import { Organization } from 'src/organizations/entities/organization.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto, user: User, organizationId: string) {

    const organizationIdNumber = validateAndConvertOrgId(organizationId);

    createBookingDto.user = user;
    createBookingDto.organization = { id: organizationIdNumber } as Organization;

    const newBooking = this.bookingRepository.save(
      this.bookingRepository.create(createBookingDto),
      );
      
    return newBooking;
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(fields: EntityCondition<Booking>): Promise<NullableType<Booking>> {
    return this.bookingRepository.findOne({ where: fields,
      relations: ['user'],
    });
  }


  update(id: Booking['id'], payload: Partial<Booking>): Promise<Booking> {
    return this.bookingRepository.save(
      this.bookingRepository.create({
        id,
        ...payload,
      }),
    );
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}
