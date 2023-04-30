import './App.css'
import { useRef } from 'react';
import DynamicInput from './Components/DynamicInput'
import RadioInputWrapper from './Components/RadioInputWrapper';
function App() {
  const childRef = useRef<any>(null);

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    childRef.current.validate();
  }




  return (
    <>
      <h1>Dynamic Forms</h1>
      <form >
        <DynamicInput name='name' required minLength={4} maxLength={10} />
        <DynamicInput type='email' name='email' validationMessage='Invalid Email Ex:name@email.com'
          pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" autoComplete='email' required />
        <DynamicInput type='checkbox' value='check' required />

        <DynamicInput type='date' name='date' required />
        <DynamicInput type='number' name='number' min={1} max={'10'} required />
        <DynamicInput type='password' minLength={8} name='password' required />
        <DynamicInput type='file' name='file' accept='image/*, text/*' required />
      </form>

      <form onSubmit={(e) => onSubmitHandler(e)}>
        <RadioInputWrapper ref={childRef}>
          <input type="radio" name="gender" value="male" /> Male
          <input type="radio" name="gender" value="female" />Female
        </RadioInputWrapper>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default App;
