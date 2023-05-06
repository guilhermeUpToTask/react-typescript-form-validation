import React, { useCallback, useRef, useEffect } from 'react';
import WrappingWithRef from '../../hoc/WrappingWithRef';
import RadioInput from '../RadioInputWrapper';
import DynamicInput from '../DynamicInput';

interface DynamicFormProps {
  children: React.ReactNode;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ children, ...restProps }) => {
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

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputsRefs.current);
    inputsRefs.current.forEach((inputRef) => {
      if (inputRef.current)
        inputRef.current.validate();
    });
  }

  return (
    <form {...restProps} noValidate onSubmit={onSubmitHandler}>
      {newChilds}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;