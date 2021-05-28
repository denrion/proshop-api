import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule, DBModule } from './config';
import { HttpExceptionFilter, TransformResponseInterceptor } from './shared';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AppConfigModule, DBModule, AuthModule, UserModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
  ],
})
export class AppModule {}
