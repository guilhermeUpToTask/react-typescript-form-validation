import React, { ReactElement, forwardRef, useState, useImperativeHandle } from "react";

type RadioGroupProps = {
    children?: React.ReactNode,
    customMessage?: string,
    name?: string,
};
type RadioGroupRef = {
    validate: () => void;
  };

  

const RadioGroup = (props: RadioGroupProps, ref: React.Ref<RadioGroupRef>) :  ReactElement=> {
    const newChilds: React.ReactNode[] = [];
    const [selectedValue, setSelectedValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validate() {
        if (selectedValue === '') {
            setErrorMessage(props.customMessage ? props.customMessage : ' Please select a value');
        }else{
            setErrorMessage('');
        }
    }

    useImperativeHandle(ref, () => ({
        validate: validate
      }));


    if (props.children) {
        React.Children.map(props.children, (child) => {
                if (React.isValidElement(child) && child.type === 'input' && child.props.type === 'radio') {
                    newChilds.push(
                        React.cloneElement<any>(child, {
                            onChange: () => setSelectedValue(child.props.value),
                            checked: child.props.value === selectedValue,
                            key: child.props.value
                        })
                    );
                }
                else {
                    newChilds.push(child);
                }
        })
    };
    return (
        <>
            {newChilds}
            {errorMessage}
        </>
    )
}

export default forwardRef(RadioGroup);
