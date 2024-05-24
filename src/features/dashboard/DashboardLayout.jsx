import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Statistics from '../dashboard/Statistics'
import SalesChart from "./SalesChart";

import { usePreviousBooking } from "../bookings/usePreviousBooking";
import { useRecentStays } from "../bookings/useRecentStays";
import TodaysActivity from "../check-in-out/TodayActivity";



const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 33rem 32rem;
  gap: 2.4rem;
`;



function DashboardLayout() {

  const {bookings: prevBookings, isLoading: isLoading1} = usePreviousBooking();
  const {bookings: confirmedBookings, isLoading: isLoading2} = useRecentStays();

  if(isLoading1 || isLoading2 ) return <Spinner/>



  return <StyledDashboardLayout>
            <Statistics confirmedBookings={confirmedBookings} bookings={prevBookings}/>
            <TodaysActivity/>
            <SalesChart bookings={prevBookings}/>
        </StyledDashboardLayout>


        
}


export default DashboardLayout;