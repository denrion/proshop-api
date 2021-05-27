import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ExceptionCode, ResponseStatus } from '../constants';
import { AppConfigService } from '../../config';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly configService: AppConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    // Add exceptions that need to be handled in a specific way here
    switch (exception.code) {
      case ExceptionCode.UNIQUE_CONSTRAINT_VIOLATION:
        exception = this.handleUniqueConstraintViolation(exception);
        break;
      case ExceptionCode.MISSING_COLUMN_ERROR:
        exception = this.handleMissingColumnError(exception);
        break;
      default:
        break;
    }

    this.sendErrorResponse(exception, reply);
  }

  private handleUniqueConstraintViolation(exception: any) {
    return new ConflictException(exception.detail);
  }

  private handleMissingColumnError(exception: any) {
    const { message, hint } = exception;

    return new BadRequestException({
      message: `${message}. ${hint && hint}`,
      error: 'Bad Request',
    });
  }

  private sendErrorResponse(exception: any, reply: FastifyReply) {
    const { response, status: exceptionStatus } = exception;

    const isProduction = this.configService.isProduction;
    const statusCode = response?.statusCode ?? exceptionStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      isProduction && statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Internal Server Error'
        : response?.message;
    const status = String(statusCode).startsWith('4')
      ? ResponseStatus.FAILURE
      : ResponseStatus.ERROR;

    this.logger.error(message, exception.stack);

    return reply
      .status(statusCode)
      .send({ status, statusCode, error: response?.error ?? message, message, data: null });
  }
}
