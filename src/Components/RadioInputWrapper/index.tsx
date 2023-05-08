import React, { ReactElement, forwardRef, useState, useImperativeHandle } from "react";
import InvalidMesssage from "../UI/InvalidMesssage";

type RadioGroupProps = {
    children?: React.ReactNode,
    customMessage?: string,
    name?: string,
    required?: boolean,
};
type RadioGroupRef = {
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
                        name: props.name
                    })
                );
            }
            else {
                newChilds.push(child);
            }
        })
    };
    console.log(newChilds);
    return (
        <>
            {(newChilds.length > 0) ? newChilds : props.children}
            {errorMessage ? <InvalidMesssage message={errorMessage} /> : null}
        </>
    )
}

export default forwardRef(RadioGroup);
