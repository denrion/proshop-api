import { PaginationLinksDTO } from '../dto/pagination-links.dto';
import { PagionationMetaDTO } from '../dto/pagination-meta.dto';
import { PaginatedResponseDTO } from '../dto/pagination-response.dto';

export interface PaginationData<E> {
  page: number;
  limit: number;
  items: E[];
  totalItems: number;
  reqUrl: string;
}

export const buildPaginatedResponse = <E>(data: PaginationData<E>): PaginatedResponseDTO<E> => {
  const { page, limit, items, totalItems, reqUrl } = data;

  const meta = createPaginationMetadata(page, limit, items.length, totalItems);
  const links = createPaginationLinks(page, limit, meta.totalPages, reqUrl);

  return new PaginatedResponseDTO({ meta, links, items });
};

const createPaginationMetadata = (
  currentPage: number,
  itemsPerPage: number,
  itemCount: number,
  totalItems: number,
): PagionationMetaDTO => {
  return {
    currentPage,
    itemCount,
    itemsPerPage,
    totalItems,
    totalPages: Math.ceil(totalItems / itemsPerPage),
  };
};

const createPaginationLinks = (
  page: number,
  limit: number,
  totalPages: number,
  reqUrl: string,
): PaginationLinksDTO => {
  const skip = (page - 1) * limit;
  const first = `${reqUrl}?limit=${limit}&page=${1}`;
  const previous = skip === 0 ? `` : `${first}&page${page - 1}`;
  const next = page + 1 <= totalPages ? `${reqUrl}?limit=${limit}&page=${page + 1}` : ``;
  const last = `${reqUrl}?limit=${limit}&page=${totalPages}`;

  return { first, previous, next, last };
};
