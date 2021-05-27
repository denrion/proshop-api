import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '../../shared';

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();
  return request.user;
});
