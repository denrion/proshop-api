import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BaseRepository } from './base.repository';
import { AbstractEntity } from './entities';
import {
  BaseCreateDTO,
  DeleteManyDTO,
  BaseUpdateDTO,
  BaseFindAllQueryDTO,
  FindOneParamsDTO,
  BaseFindOneQueryDTO,
} from './dto';

@Injectable()
export class BaseService<E extends AbstractEntity> {
  readonly logger = new Logger(`${this.entityName}Service`);

  constructor(
    public readonly repository: BaseRepository<E>,
    private readonly entityName: string,
    private readonly allowedSearchFields: string[],
  ) {}

  async create(baseCreateDto: BaseCreateDTO): Promise<E> {
    try {
      const entity = this.repository.create(baseCreateDto);
      return entity.save();
    } catch (e) {
      this.logger.error(`Create ${this.entityName} Failed`, e.stack);
      throw new UnprocessableEntityException(`${this.entityName} could not be created`);
    }
  }

  async findAll(query: BaseFindAllQueryDTO): Promise<[E[], number]> {
    const qbOptions = { query, allowedSearchFields: this.allowedSearchFields };
    return this.repository
      .createQBWithFindAllFeatures(qbOptions, this.entityName)
      .getManyAndCount();
  }

  async findOne(params: FindOneParamsDTO, query?: BaseFindOneQueryDTO): Promise<E> {
    const qbOptions = { params, query };
    const entity = await this.repository
      .createQBWithFindOneFeatures(qbOptions, this.entityName)
      .getOne();

    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${params.id} not found`);
    }

    return entity;
  }

  async update(params: FindOneParamsDTO, baseUpdateDto: BaseUpdateDTO): Promise<E> {
    const entity = await this.findOne(params);

    Object.keys(baseUpdateDto).forEach((prop) => {
      entity[prop] = baseUpdateDto[prop];
    });

    try {
      return entity.save();
    } catch (e) {
      this.logger.error(`${this.entityName} Update Failed`, e.stack);
      throw new UnprocessableEntityException(`${this.entityName} could not be updated`);
    }
  }

  async deleteOne(params: FindOneParamsDTO, hardDelete: boolean): Promise<null> {
    const entity = await this.findOne(params);

    try {
      if (hardDelete) {
        await entity.remove();
      } else {
        await entity.softRemove();
      }

      return null;
    } catch (e) {
      this.logger.error(`${this.entityName} Update Failed`, e.stack);
      throw new UnprocessableEntityException(`${this.entityName} could not be updated`);
    }
  }

  async deleteMany(baseDeleteDto: DeleteManyDTO, hardDelete: boolean): Promise<UpdateResult> {
    const { data } = baseDeleteDto;

    try {
      let deleteResponse = null;

      if (hardDelete) {
        deleteResponse = await this.repository.delete(data);
      } else {
        deleteResponse = await this.repository.softDelete(data);
      }

      return deleteResponse;
    } catch (e) {
      this.logger.error(`${this.entityName} Delete Failed`, e);
      throw new UnprocessableEntityException(`${this.entityName} could not be deleted`);
    }
  }
}
