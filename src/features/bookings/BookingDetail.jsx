import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import Empty from '../../ui/Empty'

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.header`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const navigate =  useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };



  if(isLoading) return <Spinner/>

  if(!booking) return <Empty resource="Booking"/>

  const handleDeleteBookings = function() {
    deleteBooking(booking.id, {onSuccess:() => navigate(-1)})
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && <Button  onClick={() => navigate(`/checkin/${booking.id}`)} variation="primary" size="medium">Check in booking #{booking.id}</Button>}

        {booking.status === "checked-in" && <Button disabled={isCheckingOut}  onClick={() => checkout(booking.id) } variation="primary" size="medium"><HiArrowLeftOnRectangle/> Checkout</Button>}
        <Modal>
            <Modal.Open openName="delete">
              <Button variation="danger" onClick={moveBack} size="medium">Delete</Button>
            </Modal.Open>
            <Modal.Window openName="delete">
                <ConfirmDelete resourceName="bookings" disabled={isDeleting} onConfirm={handleDeleteBookings}/>
            </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
