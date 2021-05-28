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
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import {
  CreateProductDTO,
  FindProductsQueryDTO,
  FindOneProductParamsDTO,
  FindOneProductQueryDTO,
  UpdateProductDTO,
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

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedSuccessResponse(ProductEntity)
  @Post('/')
  async create(@Body() createDto: CreateProductDTO): Promise<ProductEntity> {
    return this.productService.create(createDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @ApiPaginationResponse(ProductEntity)
  @Get('/')
  async findAll(
    @Query() queryDto: FindProductsQueryDTO,
    @RequestUrl() reqUrl: string,
  ): Promise<PaginatedResponseDTO<ProductEntity>> {
    const { page, limit } = queryDto;

    const [items, totalItems] = await this.productService.findAll(queryDto);

    return buildPaginatedResponse({ page, limit, items, totalItems, reqUrl });
  }

  @ApiOperation({ summary: 'Delete many products' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/')
  async deleteMany(
    @Body() deleteDto: DeleteManyDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<DeleteResponseDTO> {
    const { affected } = await this.productService.deleteMany(deleteDto, hardDelete);

    return { deletedCount: affected };
  }

  @ApiOperation({ summary: 'Find product by id' })
  @ApiOkSuccessResponse(ProductEntity)
  @Get('/:id')
  async findOne(
    @Param() paramsDto: FindOneProductParamsDTO,
    @Query() queryDto: FindOneProductQueryDTO,
  ): Promise<ProductEntity> {
    return this.productService.findOne(paramsDto, queryDto);
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiOkSuccessResponse(ProductEntity)
  @Put('/:id')
  async update(
    @Param() paramsDto: FindOneProductParamsDTO,
    @Body() updateDto: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.update(paramsDto, updateDto);
  }

  @ApiOperation({ summary: 'Delete product by id' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/:id')
  async deleteOne(
    @Param() paramsDto: FindOneProductParamsDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<null> {
    return this.productService.deleteOne(paramsDto, hardDelete);
  }
}
