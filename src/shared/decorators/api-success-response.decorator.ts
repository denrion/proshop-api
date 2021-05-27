import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CreatedResponseDTO, OkResponseDTO, PaginatedResponseDTO } from '../dto';

export const ApiOkSuccessResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkResponseDTO) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
    }),
  );
};

export const ApiPaginationResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkResponseDTO) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(PaginatedResponseDTO) },
                  {
                    properties: {
                      items: { type: 'array', $ref: getSchemaPath(model) },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiCreatedSuccessResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CreatedResponseDTO) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
    }),
  );
};
