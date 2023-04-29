import React from "react";
import classes from "./input.module.css";

interface IDynamicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validation: (el :HTMLInputElement) => { isValid: boolean, message: string },
}


export default function (props: IDynamicInputProps) {
    const { validation, ...restProps } = props;

    const [value, setValue] = React.useState("");
    const [isValid, setIsValid] = React.useState(true);
    const [message, setMessage] = React.useState("");

    const InputClasses = [classes.Input];
    const MessageClasses = [classes.Message];
    if (message) {
        InputClasses.push(isValid ? classes.InputValid : classes.InputInvalid);
        MessageClasses.push(isValid ? classes.MessageValid : classes.MessageInvalid);
    }

    function validate(element : HTMLInputElement) : void {
        const { isValid, message } = validation(element);
        setIsValid(isValid);
        setMessage(message);
    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }
    function onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void {
        validate(e.target);
    }

    return (
        <>
            <input className={InputClasses.join(" ")}  value={value}
                onChange={(e) => onChangeHandler(e)} onBlur={(e) => onBlurHandler(e)} {...restProps} />

            <h1 className={MessageClasses.join(" ")}>{message}</h1>
        </>

    )
}