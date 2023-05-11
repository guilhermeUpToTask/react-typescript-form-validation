import classes from "./input.module.css";
import {IInputRef } from ".";
import React, {forwardRef, useImperativeHandle} from 'react';
import ValidMessage from "../UI/ValidMessage";
import InvalidMesssage from "../UI/InvalidMesssage";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validation: (el :HTMLInputElement) => { isValid: boolean, message: string },
    label?: string,
}

const input =  function (props: IInputProps , ref: React.Ref<IInputRef>) : React.ReactElement{
    const { validation, ...restProps } = props;
    const [value, setValue] = React.useState("");
    const [isValid, setIsValid] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const InputClasses = [classes.Input];
    let MessageComponent = null
    if (message) {
        InputClasses.push(isValid ? classes.InputValid : classes.InputInvalid);
        MessageComponent = isValid ? <ValidMessage message={message} /> : <InvalidMesssage  message={message}/>;
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
    function onBlurHandler(): void {
        validate();
    }

    const Label = (props.label) ? <label className={classes.Label} htmlFor={props.id}>{props.label}</label> : null; 
    
    return (
        <>
            {Label}
            <input className={InputClasses.join(" ")}  value={value} ref={inputRef}
                onChange={(e) => onChangeHandler(e)} onBlur={onBlurHandler} {...restProps} />
             {MessageComponent}
        </>
    )
}

export default forwardRef(input);