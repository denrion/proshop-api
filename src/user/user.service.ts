import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_ALLOWED_SEARCH_FIELDS } from './constants/user-fields';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { BaseRepository, BaseService } from '../shared';

const ENTITY_NAME = 'User';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(@InjectRepository(UserRepository) public repository: BaseRepository<UserEntity>) {
    super(repository, ENTITY_NAME, USER_ALLOWED_SEARCH_FIELDS);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ email });
  }
}
