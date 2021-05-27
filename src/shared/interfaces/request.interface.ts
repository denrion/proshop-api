import { FastifyRequest } from 'fastify';
import { UserEntity } from '../../user/entities/user.entity';

export interface Request extends FastifyRequest {
  user: UserEntity;
}
