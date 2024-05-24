import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";


const Label = styled.label `
  font-weight:500;
  font-size: 13px;
`

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point


  const {
    user:{user:{
      user_metadata:{fullName: currentFullName, email}
    }}
  } = useUser();

  const {updateUser, isUpdating} =  useUpdateUser();


  const [fullName, setFullName] = useState(currentFullName || '');
  const [avatar, setAvatar] = useState(null);


  function handleSubmit(e) {
      e.preventDefault();
      updateUser({avatar, fullname:fullName || null})
      
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Email</Label>
        <Input value={email || ''} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Label>Fullname</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow >
        <Label>Profile image</Label>
        <FileInput
          id="avatar"
          accept="image/*"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" size="medium" variation="secondary">
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update Account'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
