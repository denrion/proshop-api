import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '../interfaces/request.interface';

export const RequestUrl = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();

  const { protocol, hostname, routerPath } = request;
  const url = `${protocol}://${hostname}${routerPath}`;

  return url;
});
