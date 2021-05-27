import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(request: FastifyRequest): string {
    const { protocol, hostname } = request;

    return `Application is up and running. Welcome. See swagger docs here: ${protocol}://${hostname}/api`;
  }
}
