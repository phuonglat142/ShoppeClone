import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '../constants/path'
import { schema, type Schema } from '../utils/rule'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

const useSearchProducts = () => {
  const queryConfig = useQueryConfig()

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, register }
}

export default useSearchProducts
