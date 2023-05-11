import React,{ ReactElement }from 'react';

declare module 'up-to-task-validation-form' {
    export interface FormProps {
        children: React.ReactNode;
        onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    }
    export const Form: React.FC<FormProps>;

    export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
        validation: (el: HTMLInputElement) => { isValid: boolean, message: string },
        label?: string,
    }
    export interface IInputRef  {
        validate: () => boolean;
    }
    export const Input: React.ForwardRefExoticComponent<
    IInputProps & React.RefAttributes<IInputRef>>;

    export interface RadioGroupProps {
        children?: React.ReactNode,
        customMessage?: string,
        name?: string,
        required?: boolean,
        label?: string,
        id?: string
    }
    export interface RadioGroupRef {
        validate: () => boolean;
    }
    export const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<RadioGroupRef>>;


}