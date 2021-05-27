import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional } from 'class-validator';

export interface BaseFindOneQueryDTO {
  readonly fields?: string[];
  relations?: string[];
}

export const FindOneQueryDTO = (
  allowedSelectFields: string[] = [],
  allowedRelationFields: string[] = [],
) => {
  abstract class FindOneQueryDTOClass implements BaseFindOneQueryDTO {
    @IsIn(allowedSelectFields, { each: true })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    readonly fields?: string[];

    @IsIn(allowedRelationFields, { each: true })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    relations?: string[];
  }

  return FindOneQueryDTOClass as new () => {
    [key in keyof FindOneQueryDTOClass]: FindOneQueryDTOClass[key];
  };
};
