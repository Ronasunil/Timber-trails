import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import styled from "styled-components";
import BookingsTableOperations from "../ui/BookingsTableOperations";
import { Outlet } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

function Bookings() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingsTableOperations/>
      </Row>
      <BookingTable/>
      <Outlet/>
    </Container>

  );
}

export default Bookings;
