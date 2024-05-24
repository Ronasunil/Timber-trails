import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoggingIn, errorMessage} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if(!email || !password) return;
 
    login({email, password}, {onSettled:() => {
      setEmail('');
      setPassword('')
    }});
  }

  return (
    <Form onSubmit={handleSubmit} type="login" >
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errorMessage}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary">Login {isLoggingIn ? <SpinnerMini/> : ''} </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
