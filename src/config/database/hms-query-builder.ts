import { Brackets, WhereExpression } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

declare module 'typeorm/query-builder/SelectQueryBuilder' {
  interface SelectQueryBuilder<Entity> {
    withSearch(
      this: SelectQueryBuilder<Entity>,
      search: string,
      allowedSearchFields: string[],
    ): SelectQueryBuilder<Entity>;
    withFiltering(
      this: SelectQueryBuilder<Entity>,
      filters: { [key: string]: any },
    ): SelectQueryBuilder<Entity>;
    withSelect(
      this: SelectQueryBuilder<Entity>,
      fieldsArr: string[],
      relations?: string[],
    ): SelectQueryBuilder<Entity>;
    withSorting(this: SelectQueryBuilder<Entity>, orderByArr: string[]): SelectQueryBuilder<Entity>;
    withPagination(
      this: SelectQueryBuilder<Entity>,
      page: number,
      limit: number,
    ): SelectQueryBuilder<Entity>;
  }
}

SelectQueryBuilder.prototype.withSearch = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  search: string,
  allowedSearchFields: string[],
) {
  if (search) {
    const searchQuery = { search: `%${search}%` };

    const [firstField, ...otherFields] = allowedSearchFields ?? [];

    const createBracketsObj = (qb: WhereExpression) => {
      const firstQuery = qb.where(
        `CAST(${this.alias}.${firstField} AS TEXT) ilike :search`,
        searchQuery,
      );

      const bracketsMapped = otherFields.map((field) =>
        qb.orWhere(`CAST(${this.alias}.${field} AS TEXT) ilike :search`, searchQuery),
      );

      return {
        ...firstQuery,
        ...Object.values(bracketsMapped),
      };
    };

    this.andWhere(new Brackets(createBracketsObj));
  }

  return this;
};

SelectQueryBuilder.prototype.withFiltering = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  filters: { [key: string]: any },
) {
  Object.keys(filters).forEach((key) => {
    const where = `${this.alias}.${[key]} = :${[key]}`;
    const params = { [key]: filters[key] };

    this.andWhere(where, params);
  });

  return this;
};

SelectQueryBuilder.prototype.withSelect = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  fieldsArr: string[] = [],
  relations: string[] = [],
) {
  const hasRelations = relations.length > 0;

  if (fieldsArr.length > 0) {
    const fieldsWithAlias = fieldsArr.map((field: string) => {
      if (field.includes('.') || relations.includes(field)) {
        return field;
      }

      return `${this.alias}.${field}`;
    });

    return hasRelations
      ? this.select([`${this.alias}.id`, ...fieldsWithAlias])
      : this.select(fieldsWithAlias);
  }

  return this;
};

SelectQueryBuilder.prototype.withSorting = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  orderByArr: string[] = [],
) {
  const orderBy = {};

  orderByArr.forEach((orderByStr) => {
    let key = 'createdAt';
    let value = 'DESC';

    if (orderByStr.startsWith('-')) {
      key = orderByStr.substring(1);
      value = 'DESC';
    } else {
      key = orderByStr;
      value = 'ASC';
    }

    const orderByKey = key.includes('.') ? key : `${this.alias}.${key}`;

    orderBy[orderByKey] = value;
  });

  return this.orderBy(orderBy);
};

SelectQueryBuilder.prototype.withPagination = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  page = 1,
  limit = 100,
) {
  const skip = (page - 1) * limit;
  const take = limit > 100 ? 100 : limit;

  return this.skip(skip).take(take);
};
