import './App.css'
import DynamicInput from './Components/DynamicInput'

function App() {

  return (
    <>
      <h1>Dynamic Forms</h1>
      <form>
        <DynamicInput name='name' required minLength={4} maxLength={10} />
        <DynamicInput type='email' name='email' validationMessage='Invalid Email Ex:name@email.com'
          pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" autoComplete='email' required />
        <DynamicInput type='checkbox' value='check' required />

        <DynamicInput type='date' name='date' required />
        <DynamicInput type='number' name='number' min={1} max={'10'} required />
        <DynamicInput type='password' minLength={8} name='password' required />
        <DynamicInput type='file' name='file' accept='image/*, text/*' required />
        <fieldset>
            <DynamicInput type='radio' name='test' value='test' required />
            <DynamicInput type='radio' name='test' value='test2' required />
        </fieldset>
      </form>
    </>
  )
}

export default App;
