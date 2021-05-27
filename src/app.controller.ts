import { FastifyRequest } from 'fastify';
import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(@Request() request: FastifyRequest): string {
    return this.appService.getHealth(request);
  }
}
