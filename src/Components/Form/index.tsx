import React, { useCallback, useRef } from 'react';
import WrappingWithRef from '../../hoc/WrappingWithRef';
import RadioInput from '../RadioGroup';
import DynamicInput from '../Input';
import classes from './index.module.css';

interface DynamicFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ children, onSubmit, ...restProps }) => {
  const inputsRefs = useRef<any[]>([]);



  const mapChildren = useCallback(() => {
    inputsRefs.current = [];
    const updatedChilds = React.Children.map(children as React.ReactElement, (child: React.ReactElement) => {
      if (child.type === DynamicInput || child.type === RadioInput) {
        const ChildComponent = WrappingWithRef(child.type as React.ComponentType);
        const ref = React.createRef<any>();// create a new ref for each DynamicInput
        inputsRefs.current.push(ref); // store the new ref in the array
        const newChild = <ChildComponent {...child.props} ref={ref} />;
        return newChild;
      }
      return child;
    });

    return updatedChilds;
  }, [children]);

  const newChilds = mapChildren();

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>, onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void) {
    e.preventDefault();
    console.log(inputsRefs.current);

    let result: boolean = true;
    inputsRefs.current.forEach((inputRef) => {
      if (inputRef.current && !inputRef.current.validate())
        result = false;
    });
    if (result && onSubmit) {
      onSubmit(e);
    }
  }

  return (
    <form {...restProps} noValidate className={classes.Form}
    onSubmit={(onSubmit) ? (e) => onSubmitHandler(e, onSubmit) : onSubmitHandler}>
      {newChilds}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;