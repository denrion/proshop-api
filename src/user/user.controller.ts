import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDTO,
  FindUsersQueryDTO,
  FindOneUserParamsDTO,
  FindOneUserQueryDTO,
  UpdateUserDTO,
} from './dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import {
  ApiCreatedSuccessResponse,
  ApiOkSuccessResponse,
  ApiPaginationResponse,
  DeleteManyDTO,
  DeleteResponseDTO,
  PaginatedResponseDTO,
  RequestUrl,
  UserRole,
} from '../shared';
import { buildPaginatedResponse } from '../shared/utils';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Users')
@Auth(UserRole.ADMIN)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedSuccessResponse(UserEntity)
  @Post('/')
  async create(@Body() createDto: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(createDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiPaginationResponse(UserEntity)
  @Get('/')
  async findAll(
    @Query() queryDto: FindUsersQueryDTO,
    @RequestUrl() reqUrl: string,
  ): Promise<PaginatedResponseDTO<UserEntity>> {
    const { page, limit } = queryDto;

    const [items, totalItems] = await this.userService.findAll(queryDto);

    return buildPaginatedResponse({ page, limit, items, totalItems, reqUrl });
  }

  @ApiOperation({ summary: 'Delete many users' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/')
  async deleteMany(
    @Body() deleteDto: DeleteManyDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<DeleteResponseDTO> {
    const { affected } = await this.userService.deleteMany(deleteDto, hardDelete);

    return { deletedCount: affected };
  }

  @ApiOperation({ summary: 'Find user by id' })
  @ApiOkSuccessResponse(UserEntity)
  @Get('/:id')
  async findOne(
    @Param() paramsDto: FindOneUserParamsDTO,
    @Query() queryDto: FindOneUserQueryDTO,
  ): Promise<UserEntity> {
    return this.userService.findOne(paramsDto, queryDto);
  }

  @ApiOkSuccessResponse(UserEntity)
  @Put('/:id')
  async update(
    @Param() paramsDto: FindOneUserParamsDTO,
    @Body() updateDto: UpdateUserDTO,
  ): Promise<UserEntity> {
    return this.userService.update(paramsDto, updateDto);
  }

  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/:id')
  async deleteOne(
    @Param() paramsDto: FindOneUserParamsDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<null> {
    return this.userService.deleteOne(paramsDto, hardDelete);
  }
}
