import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ResponseStatus } from '../constants';

class ErrorResponseDTO {
  @ApiResponseProperty({ enum: ResponseStatus, example: ResponseStatus.ERROR })
  status: ResponseStatus;
}

export class UnauthorizedResponseDTO extends ErrorResponseDTO {
  @ApiResponseProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: number;

  @ApiResponseProperty({ example: 'Unauthorized' })
  error: string;

  @ApiResponseProperty({ example: 'Not authenticated. Please login!' })
  message: string;
}

export class ForbiddenResponseDTO extends ErrorResponseDTO {
  @ApiResponseProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: number;

  @ApiResponseProperty({ example: 'Forbidden' })
  error: string;

  @ApiResponseProperty({ example: 'No permission to perform this action' })
  message: string;
}
