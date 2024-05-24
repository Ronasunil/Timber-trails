import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import userSchema from "../../form-schemas/userSchema";
import { useSignup } from "./useSignup";


const Label = styled.label`
  font-size: 16px;
  font-weight:500;
`


const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function SignupForm() {

  const {handleSubmit, register, formState, reset} = useForm({resolver:yupResolver(userSchema)});
  const {errors} = formState;
  const {signup, isSigning} = useSignup()

 function onSubmit (data) {
  signup(data, {onSettled:() => reset()})
 }



  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow >
        <Label>Full name</Label>
        <Input type="text" id="fullName"  {...register('fullname')}/>
        {errors?.fullname && <Error>{errors.fullname.message}</Error>}
      </FormRow>

      <FormRow >
        <Label>Email address</Label>
        <Input type="email" id="email"   {...register('email')}/>
        {errors?.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow >
        <Label>Password</Label>
        <Input type="password" id="password"   {...register('password')}/>
        {errors?.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label>Confirm password</Label>
        <Input type="password" id="passwordConfirm"  {...register('confirmPassword')}/>
        {errors?.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigning} size="medium" variation="primary">{isSigning ? 'Wait...'  : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
