export default interface InputFieldType {
    inputValue:string,
    handleChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    name:string,
    type:string,
    isReadOnly?:boolean,
    isAutoFocus?:boolean,
    placeholder:string
}
