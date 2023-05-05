import Input from "./input";
import { IInputProps, IInputRef } from "./";
import {forwardRef} from 'react';

interface validationRule { isFailed: boolean, message: string }
type validationRules = Array<(element: HTMLInputElement) => validationRule>


const validation =  function (props: IInputProps, ref: React.Ref<IInputRef>) {
    const { validationMessage, ...restProps } = props;

    function parsePropsToInt(props: string | number): number {
        return typeof props === "string" ? parseInt(props) : props;
    }
    function getAcceptedTypes(acceptedTypes: string): Array<string> {
        const acptdTsWithoutWildcard: string = acceptedTypes.replace(/\*/g, '').replace(/\s/g, '');
        return (acceptedTypes.includes(',')) ? acptdTsWithoutWildcard.split(",") : [acptdTsWithoutWildcard];
    }
    function checkType(type: string, acceptedTypes: Array<string>): boolean {
        for (const accType of acceptedTypes) {
            if (type.includes(accType)) return true;
        }
        return false;
    }

    function validateMinLength(inputElement: HTMLInputElement): validationRule {
        return (props.minLength && inputElement.value.length < props.minLength) ?
            { isFailed: true, message: "Too Short" } : { isFailed: false, message: "Correct" };
    }

    function validateMaxLength(inputElement: HTMLInputElement): validationRule {
        return (props.maxLength && inputElement.value.length > props.maxLength) ?
            { isFailed: true, message: "Too Long" } : { isFailed: false, message: "Correct" };
    }

    function validateRequired(inputElement: HTMLInputElement): validationRule {
        return (props.required && inputElement.value.length === 0) ?
            { isFailed: true, message: "Required" } : { isFailed: false, message: "Correct" };
    }
    function validatePattern(inputElement: HTMLInputElement): validationRule {
        return (props.pattern && !RegExp(props.pattern, 'v').test(inputElement.value)) ?
            { isFailed: true, message: (validationMessage) ? validationMessage : "Pattern Invalid" } :
            { isFailed: false, message: "Correct" };
    }

    function validateChecked(inputElement: HTMLInputElement): validationRule {
        return (props.type === "checkbox" && !inputElement.checked && props.required) ?
            { isFailed: true, message: "Required To Check" } :
            { isFailed: false, message: "Correct" }
    }
    function validateMinNumber(inputElement: HTMLInputElement): validationRule {
        return (props.min && props.type === "number" && inputElement.valueAsNumber < parsePropsToInt(props.min)) ?
            { isFailed: true, message: "Too Low" } : { isFailed: false, message: "Correct" };
    }
    function validateMaxNumber(inputElement: HTMLInputElement): validationRule {
        return (props.max && props.type === "number" && inputElement.valueAsNumber > parsePropsToInt(props.max)) ?
            { isFailed: true, message: "Too High" } : { isFailed: false, message: "Correct" };
    }
    function validateFileType(inputElement: HTMLInputElement): validationRule {
        return (inputElement.files && props.accept && !checkType(inputElement.files[0].type, getAcceptedTypes(props.accept))) ?
            { isFailed: true, message: "Invalid File Type" } : { isFailed: false, message: "Correct" };
    }


    function validation(inputElement: HTMLInputElement): { isValid: boolean, message: string } {

        const rules: validationRules = [
            validateChecked, validateRequired, validateMinLength, validateMaxLength,
            validatePattern, validateMinNumber, validateMaxNumber, validateFileType
        ];

        for (const rule of rules) {
            const result = rule(inputElement);
            if (result.isFailed)
                return { isValid: false, message: result.message };
        }

        return { isValid: true, message: "Correct" };

    }

    return (
        <>
            <Input validation={validation} {...restProps} ref={ref} />
        </>
    )

}

export default forwardRef(validation);
