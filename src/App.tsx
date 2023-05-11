import './App.css';
import Input from './Components/Input';
import RadioGroup from './Components/RadioGroup';
import Form from './Components/Form';
function App() {

  //this function will only be called if all the inputs are valida
  function onFormSubmit (e:React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
  }


  return (
    <>
      <h1>Form Validation Exemples:</h1>
      <Form onSubmit={onFormSubmit}>
      <Input name='name' id='name' label='Type Your Name' required minLength={4} maxLength={10} />
        <Input type='email' name='email' validationMessage='Invalid Email Ex:name@email.com'
          pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" autoComplete='email' required />
        <Input type='checkbox' value='check' required />
        <Input type='time' name='time' required />
        <Input type='date' name='date' required />
        <Input type='number' name='number' min={1} max={'10'} required />
        <Input type='password' minLength={8} name='password' required />
        <Input type='file' name='file' accept='image/*, text/*' required />
        <Input type='search' name='search' required />
        <RadioGroup name='gender' id='gender' label='Choose your Gender'  required>
          <input type="radio" value="male" /> Male
          <input type="radio" value="female" />Female
        </RadioGroup>

        <h1>Not Supported yet</h1>
        <Input type='tel' name='tel' required />
        <Input type='color' name='color' required />
      </Form>
    </>
  )
}

export default App;
