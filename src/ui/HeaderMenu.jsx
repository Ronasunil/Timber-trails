import styled from "styled-components"
import { HiOutlineUser} from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"

import Logout from "../features/authentication/Logout"
import UserAvatar from "./UserAvatar"

import ButtonIcon from "./ButtonIcon"

import {useDarkmode} from '../../src/context/DarkmodeContext'



const StyledMenu = styled.ul `
    display: flex;
    align-items:center;
    gap:14px;
`



function HeaderMenu () {
    const navigate = useNavigate()
    const {toggleDarkmode, isDarkmode} = useDarkmode();

    return <StyledMenu>
            <li>
              <UserAvatar/>
            </li>
            <li>
             <ButtonIcon onClick={() => navigate('/account')}>
                <HiOutlineUser/>
             </ButtonIcon>
            </li>
            <li>
              <ButtonIcon onClick={ toggleDarkmode}>
                {isDarkmode ? <HiOutlineSun/> : <HiOutlineMoon/>}
              </ButtonIcon>
            </li>
            <li>
              <Logout/>
            </li>
           </StyledMenu>
}


export default HeaderMenu