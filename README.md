# React TypeScript Form Validation System
This project is a validation system for forms written in React TypeScript. It covers almost all input types, including text, email, checkbox, time, date, number, password, file, and search. Additionally, it includes a radio group component. However, select and textarea inputs are still not supported.

## Installation
To use this project, you'll need to have Node.js installed. Once you have Node.js installed, you can run the following command to install the project's dependencies:

```
 npm install up-to-task-validation-form
```

## Usage

To use this project, you'll need to import the components. Here's an example of how to use the Form component with some Input components and a RadioGroup component:


```
    import { Input, RadioGroup, Form} from 'up-to-task-validation-form';

    <Form onSubmit={onFormSubmit}>
      <Input name='name' id='name' label='Type Your Name' required minLength={4} maxLength={10} />
        <Input type='email' 
          name='email' 
          validationMessage='Invalid Email Ex:name@email.com'
          pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" 
          autoComplete='email' 
          required />
        <Input type='checkbox' value='check' required /> />
        <RadioGroup name='gender' id='gender' label='Choose your Gender'  required>
          <input type="radio" value="male" /> Male
          <input type="radio" value="female" />Female
        </RadioGroup>
    </Form>
```
For proper functionality, please note that the Input and RadioGroup components should be wrapped inside the Form component.

To handle form submissions, you can define a function that will be called when the form is submitted:
```
    function onFormSubmit (e:React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));
    }
```

Note that this function will only be called if all input validations have passed.

## Components
This project includes the following components:

* Form: a wrapper component for forms.
* Input: a component for text inputs, email inputs, checkboxes, dates, times, numbers, passwords, and files.
* RadioGroup: a component for radio group inputs.

## Contributions
Contributions are welcome! To contribute to this project, fork the repository and create a pull request.

## License
This project is licensed under the MIT License.