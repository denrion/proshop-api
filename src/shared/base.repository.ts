import { QueryRunner, Repository } from 'typeorm';
import { AbstractEntity } from './entities';
import { BaseFindAllQueryDTO, BaseFindOneQueryDTO, FindOneParamsDTO } from './dto';

interface QBWithFindAllFeaturesOptions {
  query: BaseFindAllQueryDTO;
  allowedSearchFields: string[];
}

interface QBWithFindOneFeaturesOptions {
  params: FindOneParamsDTO;
  query?: BaseFindOneQueryDTO;
}

export abstract class BaseRepository<E extends AbstractEntity> extends Repository<E> {
  createQBWithFindAllFeatures(
    options: QBWithFindAllFeaturesOptions,
    alias: string,
    queryRunner?: QueryRunner,
  ) {
    const { query, allowedSearchFields } = options;
    const { page, limit, sort, fields, search, relations = [], ...filters } = query;

    const qb = this.createQueryBuilder(alias, queryRunner)
      .withSearch(search, allowedSearchFields)
      .withFiltering(filters)
      .withSorting(sort)
      .withPagination(page, limit);

    relations.forEach((relation) => {
      qb.leftJoinAndSelect(`${alias}.${relation}`, relation);
    });

    return qb.withSelect(fields, relations);
  }

  createQBWithFindOneFeatures(
    options: QBWithFindOneFeaturesOptions,
    alias: string,
    queryRunner?: QueryRunner,
  ) {
    const { query: { fields = [], relations = [], ...otherFilters } = {}, params } = options;

    const qb = this.createQueryBuilder(alias, queryRunner).withFiltering({
      ...params,
      ...otherFilters,
    });

    relations.forEach((relation) => {
      qb.leftJoinAndSelect(`${alias}.${relation}`, relation);
    });

    return qb.withSelect(fields, relations);
  }
}
