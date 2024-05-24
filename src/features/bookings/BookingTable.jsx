import { useSearchParams } from "react-router-dom";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menu from "../../ui/Menu";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from '../../ui/Pagination'



// filter function used to filter values  in api level
const FilterFn = function() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status') || 'all'

  return filterValue
}


// sort function used to  sort values  in api level
const sortFn = function() {
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sortBy') ;

  return sortValue
}


function BookingTable() {
  // here we pass different filter function accroding to value
  const {bookings, isError, isLoading, count} = useBookings(FilterFn, sortFn);

  if(isLoading) return <Spinner/>
  
  return (

      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Menu>
          <Table.Body>
            {bookings.map(booking => <BookingRow key={booking.id} data={booking}/>)}
          </Table.Body>
        </Menu>   
        <Table.Footer>
            <Pagination size={count}/>
        </Table.Footer>  
      </Table>

  );
}

export default BookingTable;
