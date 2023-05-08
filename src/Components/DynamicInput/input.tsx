import React from "react";
import classes from "./input.module.css";
import {IInputRef } from "./";
import {forwardRef, useImperativeHandle} from 'react';
import ValidMessage from "../UI/ValidMessage";
import InvalidMesssage from "../UI/InvalidMesssage";

interface IDynamicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validation: (el :HTMLInputElement) => { isValid: boolean, message: string },
}


const input =  function (props: IDynamicInputProps , ref: React.Ref<IInputRef>) {

    const { validation, ...restProps } = props;
    const [value, setValue] = React.useState("");
    const [isValid, setIsValid] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);


    const InputClasses = [classes.Input];
 //   const MessageClasses = [classes.Message];

    let MessageComponent = null;
    if (message) {
        InputClasses.push(isValid ? classes.InputValid : classes.InputInvalid);
        MessageComponent = isValid ? <ValidMessage message={message} /> : <InvalidMesssage message={message} />;
    }

    function validate() : boolean {
        if(inputRef.current){
        const { isValid, message } = validation(inputRef.current);
        setIsValid(isValid);
        setMessage(message);
            return isValid;
        }   
        return true;
    }

    useImperativeHandle(ref, () => ({
        validate: validate
      }));



    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }
    function onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void {
        validate();
    }

    return (
        <>
            <input className={InputClasses.join(" ")}  value={value} ref={inputRef}
                onChange={(e) => onChangeHandler(e)} onBlur={(e) => onBlurHandler(e)} {...restProps} />
        </>

    )
}

export default forwardRef(input);