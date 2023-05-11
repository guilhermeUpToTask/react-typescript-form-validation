import ValidateInput from "./validateInput";
import React, { forwardRef } from "react";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    validationMessage?: string;
    label?: string;
}
export interface IInputRef  {
    validate: () => boolean;
  };


const Input = function(props: IInputProps,  ref: React.Ref<IInputRef>) : React.ReactElement{
    return(
        <ValidateInput {...props} ref={ref}/>
    )
}

export default forwardRef(Input);