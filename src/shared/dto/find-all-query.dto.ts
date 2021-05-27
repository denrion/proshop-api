import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, Max, Min } from 'class-validator';
import { buildAllowedSortFields, escapeSqlWildcardChars } from '../utils';
import { IsPositiveInt } from '../decorators';

export interface BaseFindAllQueryDTO {
  readonly page: number;
  readonly limit: number;
  readonly fields?: string[];
  readonly sort?: string[];
  readonly search?: string;
  relations?: string[];
}

const MIN_PAGE = 1;
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const FindAllQueryDTO = (
  allowedSelectFields: string[] = [],
  allowedSortFields: string[] = [],
  allowedRelations: string[] = [],
) => {
  class FindAllQueryDTOClass implements BaseFindAllQueryDTO {
    @Min(MIN_PAGE)
    @IsPositiveInt()
    @IsOptional()
    readonly page: number = DEFAULT_PAGE;

    @Min(MIN_LIMIT)
    @Max(MAX_LIMIT)
    @IsPositiveInt()
    @IsOptional()
    readonly limit: number = DEFAULT_LIMIT;

    @IsIn(allowedSelectFields, { each: true })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    readonly fields?: string[];

    @IsIn(buildAllowedSortFields(allowedSortFields), { each: true })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    readonly sort?: string[];

    @IsString()
    @Transform(({ value }) => escapeSqlWildcardChars(value))
    @IsOptional()
    readonly search?: string;

    @IsIn(allowedRelations, { each: true })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    relations?: string[];
  }

  return FindAllQueryDTOClass as new () => {
    [key in keyof FindAllQueryDTOClass]: FindAllQueryDTOClass[key];
  };
};
