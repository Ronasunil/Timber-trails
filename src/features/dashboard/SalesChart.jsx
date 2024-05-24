import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Heading from "../../ui/Heading";
import { useSearchParams } from "react-router-dom";
import { eachDayOfInterval, formatDate, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;





  function SalesChart({bookings}) {
    const [searchParam] = useSearchParams()

    const last =  searchParam.get('last') || 7
  
   const days = eachDayOfInterval({
      start: subDays(new Date(), last - 1),
      end: new Date()
    })

    
    const salesData = days.map(day => {
      return {
        label: formatDate(day, 'MMM dd'),
        totalSales: bookings.filter(booking => isSameDay(new Date(booking.created_at), day)).reduce((acc, booking) => acc + booking.totalPrice, 0),
        extraSales: bookings.filter(booking => isSameDay(new Date(booking.created_at), day)).reduce((acc, booking) => acc + booking.extraPrice, 0)
      }
    })

    console.log(salesData, 'hope');

    return(<StyledSalesChart>
              <Heading as="h2">Sales chart</Heading>
              <ResponsiveContainer >
                <AreaChart width={730} height={250} data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <Area dataKey="totalSales" stroke="#4f46e5" unit="$"/>
                  <Area dataKey="extraSales" stroke="#22c55e" unit="$" />
                  <YAxis unit="$"/>
                  <XAxis dataKey="label" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
    </StyledSalesChart>)

  } 
  
  
  export default SalesChart;