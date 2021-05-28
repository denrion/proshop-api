import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseBoolPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import {
  CreateOrderDTO,
  FindOrdersQueryDTO,
  FindOneOrderParamsDTO,
  FindOneOrderQueryDTO,
  UpdateOrderDTO,
} from './dto';
import {
  ApiCreatedSuccessResponse,
  ApiPaginationResponse,
  RequestUrl,
  PaginatedResponseDTO,
  ApiOkSuccessResponse,
  DeleteResponseDTO,
  DeleteManyDTO,
} from '../shared';
import { buildPaginatedResponse } from '../shared/utils';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedSuccessResponse(OrderEntity)
  @Post('/')
  async create(@Body() createDto: CreateOrderDTO): Promise<OrderEntity> {
    return this.orderService.create(createDto);
  }

  @ApiOperation({ summary: 'Get Orders' })
  @ApiPaginationResponse(OrderEntity)
  @Get('/')
  async findAll(
    @Query() queryDto: FindOrdersQueryDTO,
    @RequestUrl() reqUrl: string,
  ): Promise<PaginatedResponseDTO<OrderEntity>> {
    const { page, limit } = queryDto;

    const [items, totalItems] = await this.orderService.findAll(queryDto);

    return buildPaginatedResponse({ page, limit, items, totalItems, reqUrl });
  }

  @ApiOperation({ summary: 'Delete many Orders' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/')
  async deleteMany(
    @Body() deleteDto: DeleteManyDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<DeleteResponseDTO> {
    const { affected } = await this.orderService.deleteMany(deleteDto, hardDelete);

    return { deletedCount: affected };
  }

  @ApiOperation({ summary: 'Find Order by id' })
  @ApiOkSuccessResponse(OrderEntity)
  @Get('/:id')
  async findOne(
    @Param() paramsDto: FindOneOrderParamsDTO,
    @Query() queryDto: FindOneOrderQueryDTO,
  ): Promise<OrderEntity> {
    return this.orderService.findOne(paramsDto, queryDto);
  }

  @ApiOperation({ summary: 'Update Order by id' })
  @ApiOkSuccessResponse(OrderEntity)
  @Put('/:id')
  async update(
    @Param() paramsDto: FindOneOrderParamsDTO,
    @Body() updateDto: UpdateOrderDTO,
  ): Promise<OrderEntity> {
    return this.orderService.update(paramsDto, updateDto);
  }

  @ApiOperation({ summary: 'Delete Order by id' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/:id')
  async deleteOne(
    @Param() paramsDto: FindOneOrderParamsDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<null> {
    return this.orderService.deleteOne(paramsDto, hardDelete);
  }
}
