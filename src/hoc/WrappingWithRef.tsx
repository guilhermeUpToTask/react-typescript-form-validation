/*
    This is a higher-order component that creates a new component by wrapping an existing one. The new component is
 returned as a result of invoking React.forwardRef, which allows the new component to accept a ref prop.

    The forwardRef function takes a function as its argument, which in turn returns a new component.
 The returned function takes two arguments - props and ref - and returns 
 the original component with the ref prop added to it.

 When looping through a list of children components in React, the children are not actually React components 
 but rather React elements. In order to make use of the ref feature on these elements, we need to create a new
  component with the correct type and props. This is where the WrappingWithRef function comes in.

WrappingWithRef takes a ComponentType argument, which represents a React component type. It returns a new component that
 wraps the original component and passes through all the props, including a ref that can be used to 
 reference the underlying DOM node.

To use WrappingWithRef, simply pass in a ComponentType as an argument and it will return a new component that can be used to 
enhance the ref functionality of the original component.
*/

import React from 'react';
export default function (ComponentType: React.ComponentType<any>) {
    return React.forwardRef((props, ref) => {
      return <ComponentType {...props} ref={ref} />;
    });
  }