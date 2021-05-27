import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { SwaggerAuthorizationType } from '../../shared/constants';

// import {
//   SwaggerAuthorizationType,
//   UnauthorizedResponseDTO,
//   ForbiddenResponseDTO,
//   OkResponseDTO,
//   CreatedResponseDTO,
//   DeleteResponseDTO,
//   PaginatedResponseDTO,
// } from '@app/shared';
// import { AuthResponseDTO } from '@app/auth/dto/auth-response.dto';

const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;

@Injectable()
export class SwaggerService {
  setupSwaggerConfig = (app: NestFastifyApplication) => {
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'My API Docs',
    };

    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setVersion(APP_VERSION)
      .setDescription('Some description here')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          description: 'Enter JWT token',
        },
        SwaggerAuthorizationType.BEARER_TOKEN,
      )
      // .addApiKey(
      //   {
      //     type: 'apiKey',
      //     in: 'header',
      //     description: 'Enter api key',
      //   },
      //   AuthorizationType.API_KEY,
      // )
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      extraModels: [
        // OkResponseDTO,
        // CreatedResponseDTO,
        // UnauthorizedResponseDTO,
        // ForbiddenResponseDTO,
        // AuthResponseDTO,
        // DeleteResponseDTO,
        // PaginatedResponseDTO,
      ],
    });

    SwaggerModule.setup('api', app, document, customOptions);
  };
}
