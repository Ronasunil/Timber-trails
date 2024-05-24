import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import Checkbox from "../../ui/Checkbox";
import { useLocation } from "react-router-dom";




const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  margin: 2rem 0;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.ispaid  === "true" ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.ispaid === "true" ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Confirmations = styled.div`
  display:flex;
  flex-direction:column;
  gap: 2.9rem;
  justify-content:center;
  padding: 2rem 4rem;

` 

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking, paidStatus, setPaidStatus, breakfast = 0, handleAddBreakfast, settings }) {
  const {pathname} = useLocation();


  
  const {
    created_at,
    startDate,
    endDate,
    numOfStays,
    numGuest,
    totalPrice,
    extraPrice,
    status,
    price,
    hasBreakfast,
    observation,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalid },
    cabins: { name: cabinName },
  } = booking;



  

  // calculating total  breakfast price if there is breakfast
  if(pathname.startsWith('/checkin')) var addonPrice = settings.breakfastPrice * numOfStays * numGuest;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numOfStays} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuest > 1 ? `+ ${numGuest - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalid}</p>
        </Guest>

        {observation && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observation}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast  ? "Yes" : "No"}
        </DataItem>

        <Price ispaid={String(isPaid)}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(price)} cabin + ${formatCurrency(
                extraPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      {
        pathname.startsWith('/checkin') && status === "unconfirmed" &&
        <Confirmations>
          <Checkbox checked={breakfast} onChange={handleAddBreakfast}>Add additional breakfast of {formatCurrency(addonPrice)}</Checkbox>
          <Checkbox onChange={() => setPaidStatus(!paidStatus)} checked={paidStatus} disabled={paidStatus}>I confirm that {guestName} has paid the total amount of {breakfast ?  `${formatCurrency(price + addonPrice)}  (${formatCurrency(price)} + ${formatCurrency(addonPrice)})`  : formatCurrency(price)} </Checkbox>
        </Confirmations>
      }
      
      
      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>

  
  );
}

export default BookingDataBox;
