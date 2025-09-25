import type { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions<any>
}

const Input = ({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}

  return (
    <div className={className}>
      <input
        className={classNameInput}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
