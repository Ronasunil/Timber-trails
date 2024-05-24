import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import Menu from "../../ui/Menu";
import { HiDotsVertical, HiLocationMarker } from "react-icons/hi";
import { HiArrowLeftStartOnRectangle,  HiEye, HiTrash} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({data}) {
  const navigate = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking()

  const  {
    id: bookingId,
    startDate,
    endDate,
    numOfStays,
    totalPrice,
    status,
    guests,
    cabins,
  } = data;



  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabins.name}</Cabin>

      <Stacked>
        <span>{guests.name}</span>
        <span>{guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : startDate}{" "}
          &rarr; {numOfStays} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menu.Item>
        <Menu.Toggle id={bookingId}>
          <HiDotsVertical/>
        </Menu.Toggle>
        <Menu.List openId={bookingId}>
            <Menu.Button onClick={() =>navigate(`/bookings/${bookingId}`) }><HiEye/> View</Menu.Button>
           {status === "unconfirmed" && <Menu.Button disabled={isCheckingOut} onClick={() => navigate(`/checkin/${bookingId}`)}><HiLocationMarker/> Check-in</Menu.Button>}
           {status === "checked-in" && <Menu.Button disabled={isCheckingOut} onClick={() => checkout(bookingId)} ><HiArrowLeftStartOnRectangle/> Check-out</Menu.Button>}
           <Modal>
              <Modal.Open>
                  <Menu.Button><HiTrash/>Delete</Menu.Button>
              </Modal.Open>
              <Modal.Window>
                <ConfirmDelete disabled={isDeleting} onConfirm={() => deleteBooking(bookingId) } resourceName="Bookings"/>
              </Modal.Window>
           </Modal>
            
        </Menu.List>
      </Menu.Item>
    </Table.Row>
  );
}

export default BookingRow;


