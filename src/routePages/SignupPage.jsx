import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { UserContext } from '../contexts.jsx';

import './SignupPage.css';

// ==================================================

/**
 * Displays and handles the user registration form.
 */
function SignupPage() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await signup(formData);
    } catch (err) {
      setErrorMessage(err.message);
      return;
    }

    navigate('/');
  }

  return (
    <main className="Signup">
      <title>Yodlr Registration Portal</title>
      <h1>Yodlr Registration Portal</h1>
      <Form className="Signup__form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="Signup__input-first-name">
            <b>First Name</b>
          </Label>
          <Input
            id="Signup__input-first-name"
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Signup__input-last-name">
            <b>Last Name</b>
          </Label>
          <Input
            id="Signup__input-last-name"
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Signup__input-email">
            <b>Email</b>
          </Label>
          <Input
            id="Signup__input-email"
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          ></Input>
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      </Form>
    </main>
  );
}

// ==================================================

export default SignupPage;
