import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodaysAcitivity } from "./useTodaysActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / -1;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodaysActivity() {
  const {todaysBooking, isLoading} = useTodaysAcitivity();

  console.log(todaysBooking, 'lkop')
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today&apos;s activity</Heading>
      </Row>
      <Row>
        {isLoading && <Spinner/>}
        {!isLoading && todaysBooking.length === 0 && <NoActivity>No activity for today</NoActivity>}
        {!isLoading && <TodayList>{todaysBooking.map(booking => <TodayItem booking={booking}/>)}</TodayList>}
      </Row>
    </StyledToday>
  );
}

export default TodaysActivity;
