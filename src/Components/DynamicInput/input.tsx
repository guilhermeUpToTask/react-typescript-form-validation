import React from "react";
import classes from "./input.module.css";
import {IInputRef } from "./";
import {forwardRef, useImperativeHandle} from 'react';

interface IDynamicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validation: (el :HTMLInputElement) => { isValid: boolean, message: string },
}


const input =  function (props: IDynamicInputProps , ref: React.Ref<IInputRef>) {
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

    useImperativeHandle(ref, () => ({
        validate: validate
      }));



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

export default forwardRef(input);