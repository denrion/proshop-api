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
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';
import {
  FindOneReviewParamsDTO,
  CreateReviewDTO,
  FindReviewsQueryDTO,
  FindOneReviewQueryDTO,
  UpdateReviewDTO,
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

@ApiTags('Reviews')
@Controller('products/:productId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a new review' })
  @ApiCreatedSuccessResponse(ReviewEntity)
  @Post('/')
  async create(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Body() createDto: CreateReviewDTO,
  ): Promise<ReviewEntity> {
    createDto.fkProductId = paramsDto.productId;

    return this.reviewService.create(createDto);
  }

  @ApiOperation({ summary: 'Get Reviews' })
  @ApiPaginationResponse(ReviewEntity)
  @Get('/')
  async findAll(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Query() queryDto: FindReviewsQueryDTO,
    @RequestUrl() reqUrl: string,
  ): Promise<PaginatedResponseDTO<ReviewEntity>> {
    queryDto.fkProductId = paramsDto.productId;

    const { page, limit } = queryDto;

    const [items, totalItems] = await this.reviewService.findAll(queryDto);

    return buildPaginatedResponse({ page, limit, items, totalItems, reqUrl });
  }

  @ApiOperation({ summary: 'Delete many reviews' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/')
  async deleteMany(
    @Body() deleteDto: DeleteManyDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<DeleteResponseDTO> {
    const { affected } = await this.reviewService.deleteMany(deleteDto, hardDelete);

    return { deletedCount: affected };
  }

  @ApiOperation({ summary: 'Find review by id' })
  @ApiOkSuccessResponse(ReviewEntity)
  @Get('/:id')
  async findOne(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Query() queryDto: FindOneReviewQueryDTO,
  ): Promise<ReviewEntity> {
    return this.reviewService.findOne(paramsDto, queryDto);
  }

  @ApiOperation({ summary: 'Update review by id' })
  @ApiOkSuccessResponse(ReviewEntity)
  @Put('/:id')
  async update(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Body() updateDto: UpdateReviewDTO,
  ): Promise<ReviewEntity> {
    return this.reviewService.update(paramsDto, updateDto);
  }

  @ApiOperation({ summary: 'Delete review by id' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/:id')
  async deleteOne(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<null> {
    return this.reviewService.deleteOne(paramsDto, hardDelete);
  }
}
