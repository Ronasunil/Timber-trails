import {HiOutlineBriefcase, HiOutlineCalendar } from 'react-icons/hi';
import Stat from './Stat'
import { HiOutlineArrowLeftStartOnRectangle, HiOutlineBanknotes } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Statistics({bookings, confirmedBookings}) {
    // calculating total bookings;
    const totalBookings = bookings.length;

    // calculating total sales
    const totalSales = bookings.reduce((acc,booking) => booking.totalPrice + acc, 0);

    // calculating total checkins
    const totalCheckins = confirmedBookings.length;

    // calculating total checkouts
    const totalCheckouts = confirmedBookings.filter(booking => booking.status === 'checked-out').length;


    return <>
            <Stat icon={<HiOutlineBriefcase/>} title="Bookings" value={totalBookings} color="blue"/>
            <Stat icon={<HiOutlineBanknotes/>} title="Sales" value={formatCurrency(totalSales)} color="green"/>
            <Stat icon={<HiOutlineCalendar/>} title="Check-ins" value={totalCheckins} color="indigo"/>
            <Stat icon={<HiOutlineArrowLeftStartOnRectangle/>} title="Check-outs" value={totalCheckouts} color="grey"/>
           </>
}


export default Statistics;