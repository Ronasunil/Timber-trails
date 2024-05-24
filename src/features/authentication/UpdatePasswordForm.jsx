import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";

const Label = styled.label `
  font-weight:500;
  font-size: 13px;
`

const Error = styled.p`
  font-size:12px;
  font-weight:400;
  color: var(--color-red-700)
`

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label>Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow >
      <Label>Confirm password</Label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" size="medium" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating} size="medium" variation="primary">Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
