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
import { CreateReviewDTO } from './dto/create-review.dto';
import { FindOneReviewParamsDTO } from './dto/find-one-review-params.dto';
import { FindOneReviewQueryDTO } from './dto/find-one-review-query.dto';
import { FindReviewsQueryDTO } from './dto/find-reviews-query.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';
import {
  ApiCreatedSuccessResponse,
  ApiPaginationResponse,
  RequestUrl,
  PaginatedResponseDTO,
  ApiOkSuccessResponse,
  DeleteResponseDTO,
  DeleteManyDTO,
  UserRole,
} from '../shared';
import { buildPaginatedResponse } from '../shared/utils';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Reviews')
@Auth(UserRole.USER)
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

  @Auth(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete many Reviews' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/')
  async deleteMany(
    @Body() deleteDto: DeleteManyDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<DeleteResponseDTO> {
    const { affected } = await this.reviewService.deleteMany(deleteDto, hardDelete);

    return { deletedCount: affected };
  }

  @ApiOperation({ summary: 'Find Review by id' })
  @ApiOkSuccessResponse(ReviewEntity)
  @Get('/:id')
  async findOne(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Query() queryDto: FindOneReviewQueryDTO,
  ): Promise<ReviewEntity> {
    return this.reviewService.findOne(paramsDto, queryDto);
  }

  @ApiOperation({ summary: 'Update Review by id' })
  @ApiOkSuccessResponse(ReviewEntity)
  @Put('/:id')
  async update(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Body() updateDto: UpdateReviewDTO,
  ): Promise<ReviewEntity> {
    return this.reviewService.update(paramsDto, updateDto);
  }

  @ApiOperation({ summary: 'Delete Review by id' })
  @ApiOkSuccessResponse(DeleteResponseDTO)
  @Delete('/:id')
  async deleteOne(
    @Param() paramsDto: FindOneReviewParamsDTO,
    @Query('hardDelete', ParseBoolPipe) hardDelete?: boolean,
  ): Promise<null> {
    return this.reviewService.deleteOne(paramsDto, hardDelete);
  }
}
