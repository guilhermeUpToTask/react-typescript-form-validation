import React, { useRef } from 'react';
import WrappingWithRef from '../../hoc/WrappingWithRef';
import RadioInput from '../RadioInputWrapper';
import DynamicInput from '../DynamicInput';


export default function MyForm(props: any) {
  const InputsRefs = useRef<Array<any>>([]);

  function registerInput(ref: any) {
    console.log(ref,'new ref');
    InputsRefs.current.push(ref);
  }


  function onSubmitHandler( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(InputsRefs.current);
  }

  const newChilds: React.ReactNode[] = (React.Children.map(props.children, (child: React.ReactElement) => {
    if (child.type === DynamicInput) {
      console.log(child.props);
      const ChildComponent = WrappingWithRef(child.type as React.ComponentType);
      return <ChildComponent {...child.props} ref={(ref:any) => registerInput(ref)} />;
    }
    return child;
  }));

  console.log(newChilds);

  return (
    <form {...props} noValidate onSubmit={onSubmitHandler}>
      {newChilds}
      <button type="submit">Submit</button>
    </form>
  );
}
