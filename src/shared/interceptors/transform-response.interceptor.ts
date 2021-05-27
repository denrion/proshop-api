import { FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { SuccessResponseDTO } from '../dto';
import { ResponseStatus } from '../constants';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, SuccessResponseDTO<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseDTO<T>> {
    const ctx = context.switchToHttp();
    const { statusCode } = ctx.getResponse<FastifyReply>();

    return next
      .handle()
      .pipe(map((data: T) => ({ status: ResponseStatus.SUCCESS, statusCode, data })));
  }
}
