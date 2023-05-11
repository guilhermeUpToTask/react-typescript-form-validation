import React, { ReactElement, forwardRef, useState, useImperativeHandle } from "react";
import InvalidMesssage from "../UI/InvalidMesssage";
import classes from './index.module.css';

interface RadioGroupProps {
    children?: React.ReactNode,
    customMessage?: string,
    name?: string,
    required?: boolean,
    label?: string,
    id?: string
};
interface RadioGroupRef {
    validate: () => boolean;
};



const RadioGroup = (props: RadioGroupProps, ref: React.Ref<RadioGroupRef>): ReactElement => {
    const newChilds: React.ReactNode[] = [];
    const [selectedValue, setSelectedValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validate() {
        if (selectedValue === '' && props.required) {
            setErrorMessage(props.customMessage ? props.customMessage : ' Please select a value');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    }

    useImperativeHandle(ref, () => ({
        validate: validate
    }));


    if (props.children && props.required) {
        React.Children.map(props.children, (child) => {
            if (React.isValidElement(child) && child.type === 'input' && child.props.type === 'radio') {
                newChilds.push(
                    React.cloneElement<any>(child, {
                        onChange: () => setSelectedValue(child.props.value),
                        checked: child.props.value === selectedValue,
                        key: child.props.value,
                        name: props.name,
                    })
                );
            }
            else {
                newChilds.push(child);
            }
        })
    };
    
    const Label = (props.label) ? <label className={classes.Label} > {props.label}</label> : null; 
    return (
        <>
            {Label}
            {(newChilds.length > 0) ? newChilds : props.children}
            {errorMessage ? <InvalidMesssage message={errorMessage} /> : null}
        </>
    )
}

export default forwardRef(RadioGroup);
