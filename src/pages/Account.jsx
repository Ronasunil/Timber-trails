import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'
import '../features/authentication/UpdatePasswordForm'
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
`

function Account() {
  return (
    <Container>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical" >
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm/>
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm/>
      </Row>
    </Container>
  );
}

export default Account;
