import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const Container = styled.div`
  display:flex;
  flex-direction: column;
  gap:2rem;
`

function NewUsers() {
  return <Container>
          <Heading as="h1">Create a new user</Heading>
          <SignupForm/>
         </Container>
  
}

export default NewUsers;
