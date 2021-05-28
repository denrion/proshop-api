import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserRepository } from '../../../user/user.repository';
import { BaseRepository, UserRole } from '../../../shared';
import { DeepPartial } from 'typeorm';

const users: DeepPartial<UserEntity>[] = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: 'tesT1234',
    role: UserRole.ADMIN,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'tesT1234',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'tesT1234',
  },
];

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository) public userRepository: BaseRepository<UserEntity>,
  ) {}

  async seed(): Promise<UserEntity[]> {
    const usersToSave = this.userRepository.create(users);

    return this.userRepository.save(usersToSave);
  }

  async drop(): Promise<any> {
    return this.userRepository.delete({});
  }
}
