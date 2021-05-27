import { ApiHideProperty } from '@nestjs/swagger';
import { PaginationLinksDTO } from './pagination-links.dto';
import { PagionationMetaDTO } from './pagination-meta.dto';

export class PaginatedResponseDTO<T> {
  meta: PagionationMetaDTO;
  links: PaginationLinksDTO;

  @ApiHideProperty()
  items: T[];

  constructor(partial: Partial<PaginatedResponseDTO<T>>) {
    Object.assign(this, partial);
  }
}
