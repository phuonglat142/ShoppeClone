import type { ProductListConfig } from '../types/product.type'
import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category,
      name: queryParams.name,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )

  return queryConfig
}

export default useQueryConfig
