import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {useCheckout} from './useCheckout'

import Tag from '../../ui/Tag'
import {Flag} from '../../ui/Flag'
import Button from '../../ui/Button'
import Spinner from "../../ui/Spinner";



const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 2fr  2fr 2fr 2fr 2fr 2fr ;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Email = styled.p`
  font-weight:500;
  color: var(--color-grey-500);
`



function TodayItem({booking}) {
  const navigate  = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  const {status,id,  guests:{name, email, countryFlag, nationality}, } = booking;




  if(isCheckingOut) return <Spinner/>

  return (<StyledTodayItem>

            {status === "unconfirmed" &&   <Tag type="green" title="unconfirmed" >{status}</Tag>} 
            {status === "checked-in" && <Tag type="blue" title="Checked-in">{status}</Tag>}
            <Guest>{name}</Guest>
            <Email>{email}</Email>
            <Flag src={countryFlag} alt={`Country flag of ${name}`}/>
            <span>{nationality}</span>
            {status === "unconfirmed" ? <Button onClick={() => navigate(`/checkin/${id}`)} size="small" variation="primary">check-in</Button> : <Button onClick={() => checkout(id)} size="small" variation="primary">check-out</Button>}
          </StyledTodayItem>)
}


export default TodayItem