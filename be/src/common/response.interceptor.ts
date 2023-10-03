import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from './pagination.helper';

interface ResponseFormat {
  status: number;
  data: {
    result: any | any[];
    currentPage?: number;
    total?: number;
    totalPages?: number;
    limit?: number;
  };
}

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat> {
    const http = context.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        const isArray = Array.isArray(data);
        const isPagination =
          isArray && data.length === 2 && typeof data[1] === 'number';

        const response: any = { result: data };

        if (isPagination) {
          const paginationData = PaginationResponse(
            {
              limit: +(request.query.limit as string),
              page: +(request.query.page as string),
            },
            data,
          );

          response.result = data[0];
          response.currentPage = paginationData.page;
          response.limit = paginationData.limit;
          response.total = paginationData.total_items;
          response.totalPage = paginationData.total_page;
        }

        return {
          status,
          data: response,
        };
      }),
    );
  }
}
