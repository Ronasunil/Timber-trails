import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import {useCheckin} from './useCheckin'
import { useSettings } from "../settings/useSettings";
import Empty from "../../ui/Empty";


const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {booking, isLoading} = useBooking();
  const {checkinBooking, isCheckingIn} = useCheckin()
  const {settings, isLoading:isSettingsLoading} = useSettings()
  const moveBack = useMoveBack();

  const [paidStatus, setPaidStatus] = useState(false); 
  const [breakfast, setAdditionalBreakfast] = useState(false);



  useEffect(() => {
    setPaidStatus(booking?.isPaid || false)
  },[booking])

  const handleAddBreakfast = function() {
    setAdditionalBreakfast(breakfast => !breakfast);
    setPaidStatus(false);
  }


  if(isLoading || isSettingsLoading) return <Spinner/>

  if(!booking) return <Empty resource="Booking"/>

  const {
    id: bookingId,
    status,
    guests,
    totalPrice,
    price,
    numGuest,
    numOfStays,
    hasBreakfast,
    isPaid,
    numNights,
  } = booking;


  function handleCheckin() {
    if(!paidStatus) return;
    if(breakfast) {
      // calculating breafast price
      const extraPrice =  settings.breakfastPrice * numGuest * numOfStays ;

      // updating
      const data = {bookingId, updationObj:{extraPrice, totalPrice: extraPrice + price, hasBreakfast: true}}
      checkinBooking(data);
    }

    else {
      CheckinBooking({bookingId, updationObj:{}})
    }

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox paidStatus={paidStatus} setPaidStatus={setPaidStatus} booking={booking} breakfast={breakfast} handleAddBreakfast={handleAddBreakfast} settings={settings} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button disabled={!paidStatus || isCheckingIn} onClick={handleCheckin} variation="primary" size="medium">Check in booking #{bookingId}</Button>}
        <Button variation="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
