import { BadRequestException, Provider, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { HttpExceptionsFilter, ResponseTransformInterceptor } from './common';

const exceptionFactory = (errors: ValidationError[]) => {
  throw new BadRequestException(
    errors.reduce((prev, next) => {
      const err = validationErrors(next);

      return {
        ...prev,
        ...err,
      };
    }, {}),
  );
};

const validationErrors = (err: ValidationError) => {
  if (!err.constraints && err.children && err.children.length > 0) {
    return validationErrors(err.children[0]);
  }

  return {
    [err.property]: {
      errorCode: 'BAD_REQUEST',
      message: err.constraints ? Object.values(err.constraints)[0] : '',
    },
  };
};

export const AppProviders: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseTransformInterceptor,
  },
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      exceptionFactory,
    }),
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionsFilter,
  },
];
