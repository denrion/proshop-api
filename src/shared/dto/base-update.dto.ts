import { PartialType } from '@nestjs/swagger';
import { BaseCreateDTO } from './base-create.dto';

export class BaseUpdateDTO extends PartialType(BaseCreateDTO) {}
