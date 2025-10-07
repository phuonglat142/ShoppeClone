import { useState, type InputHTMLAttributes } from 'react'
import { useController, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}




function InputV2<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & InputNumberProps
) {
  const {
    type,
    onChange,
    className,
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      //Cập nhập local value state
      setLocalValue(valueFormInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input {...field} {...rest} className={classNameInput} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
