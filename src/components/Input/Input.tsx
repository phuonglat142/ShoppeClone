import type { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions<any>
  autoComplete?: string
}

const Input = ({ type, errorMessage, placeholder, className, name, register, rules, autoComplete }: Props) => {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default Input
