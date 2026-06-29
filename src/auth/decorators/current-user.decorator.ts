import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Usage: @CurrentUser() user dans les parametres d'une route protegee par JwtAuthGuard
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
