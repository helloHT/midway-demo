import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const result = await next();
        const { message = '成功', data = {} } = result;
        return {
          code: 200,
          result: 'success',
          message,
          data,
        };
      } catch (err) {
        return {
          code: 400,
          result: 'error',
          message: err.message,
          data: null,
        };
      }
    };
  }
}
