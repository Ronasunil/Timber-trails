
import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import HeaderMenu from "./HeaderMenu"

const StyledHeader = styled.header `
    
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    display:flex;
    align-items:center;
    justify-content:end;
`

export default function Header() {
    return <StyledHeader>
              <HeaderMenu/>
           </StyledHeader>
}