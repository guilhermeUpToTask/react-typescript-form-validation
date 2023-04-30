import ValidateInput from "./validateInput";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    validationMessage?: string;
}

export default function(props: IInputProps){

    return(
        <ValidateInput {...props}/>
    )
}