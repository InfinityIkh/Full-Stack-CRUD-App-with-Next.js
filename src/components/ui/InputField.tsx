import { InputHTMLAttributes } from "react"

type InputFieldProps = {
  labelVal: string,
  inputType: string,
  inputName: string,
  className?: string,
  placeholder: string
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({ labelVal, inputType, inputName, className, placeholder, ...props }: InputFieldProps) => {
  return (
    <div className="mb-3">
      <label className="flex">{labelVal}</label>
      <input name={inputName} type={inputType} className={`${className} border w-full px-3 py-2 rounded`} placeholder={placeholder} {...props} />
    </div>
  )
}

export default InputField
