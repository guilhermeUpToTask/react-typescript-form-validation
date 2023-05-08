import './App.css'
import DynamicInput from './Components/DynamicInput'
import RadioInputWrapper from './Components/RadioInputWrapper';
import Form from './Components/Form';
function App() {

  function onFormSubmit (e:React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));

  }


  return (
    <>
      <h1>Dynamic Forms</h1>
      <Form onSubmit={onFormSubmit}>
      <DynamicInput name='name' required minLength={4} maxLength={10} />
        <DynamicInput type='email' name='email' validationMessage='Invalid Email Ex:name@email.com'
          pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" autoComplete='email' required />
        <DynamicInput type='checkbox' value='check' required />
        <DynamicInput type='time' name='time' required />
        <DynamicInput type='date' name='date' required />
        <DynamicInput type='number' name='number' min={1} max={'10'} required />
        <DynamicInput type='password' minLength={8} name='password' required />
        <DynamicInput type='file' name='file' accept='image/*, text/*' required />
        <DynamicInput type='search' name='search' required />
        <RadioInputWrapper name='gender' required>
          <input type="radio" value="male" /> Male
          <input type="radio" value="female" />Female
        </RadioInputWrapper>

        <h1>Not Supported yet</h1>
        <DynamicInput type='tel' name='tel' required />
        <DynamicInput type='color' name='color' required />
      </Form>
    </>
  )
}

export default App;
