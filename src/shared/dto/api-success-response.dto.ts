import { ApiHideProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ResponseStatus } from '../constants';

export class SuccessResponseDTO<T> {
  @ApiResponseProperty({ enum: ResponseStatus, example: ResponseStatus.SUCCESS })
  status: ResponseStatus;

  @ApiHideProperty()
  data: T;
}

export class OkResponseDTO<T> extends SuccessResponseDTO<T> {
  @ApiResponseProperty({ example: 200 })
  statusCode: number;
}

export class CreatedResponseDTO<T> extends SuccessResponseDTO<T> {
  @ApiResponseProperty({ example: 201 })
  statusCode: number;
}
