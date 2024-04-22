import { FC } from "react"
import InputFieldType from "../types/InputFieldType"


const InputField:FC<InputFieldType> = ({inputValue,handleChange,type,name,placeholder,isReadOnly = false,isAutoFocus = false}) => {
  return (
    <div className="py-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{placeholder}</label>
      <input autoFocus = {isAutoFocus} readOnly={isReadOnly} required type={type} name={name} value={inputValue} onChange={handleChange} className={`mt-1 p-2 w-full border rounded-md outline-none ${!isReadOnly && 'focus:outline-blue-600'}`} />
    </div>
  )
}

export default InputField