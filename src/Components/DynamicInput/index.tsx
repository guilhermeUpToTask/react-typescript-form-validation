import ValidateInput from "./validateInput";
import React, { forwardRef } from "react";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    validationMessage?: string;
}
export interface IInputRef  {
    validate: () => boolean;
  };


const Input = function(props: IInputProps,  ref: React.Ref<IInputRef>) {
    return(
        <ValidateInput {...props} ref={ref}/>
    )
}

export default forwardRef(Input);