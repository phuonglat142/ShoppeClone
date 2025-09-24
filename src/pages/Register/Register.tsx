import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema, type Schema } from '../../utils/rule'
import Input from '../../components/Input/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/util'
import type { ErrorResponse } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<Schema, 'confirm_password'>, {
                message: formError[key as keyof Omit<Schema, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Nhập email'
                errorMessage={errors.email?.message}
                className='mt-8'
                autoComplete='on'
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Nhập mật khẩu'
                errorMessage={errors.password?.message}
                className='mt-2'
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex items-center justify-center'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản ?</span>
                <Link to='/login' className='text-red-400 ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
