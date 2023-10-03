import { DEFAULT_QUERY } from './constant';

export const PaginationResponse = (
  defaultPagination: { limit: number; page: number },
  data: any[],
) => {
  const { page: pageQuery, limit: limitQuery } = defaultPagination;
  const page = pageQuery ? pageQuery : DEFAULT_QUERY.PAGE;
  const limit = limitQuery
    ? limitQuery <= DEFAULT_QUERY.MAX_LIMIT
      ? limitQuery
      : DEFAULT_QUERY.MAX_LIMIT
    : DEFAULT_QUERY.LIMIT;
  const total_items = data[1];
  const total_page = Math.ceil(data[1] / +limit);

  return {
    page,
    limit,
    total_items,
    total_page,
  };
};
