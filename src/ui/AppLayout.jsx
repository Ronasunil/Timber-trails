import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display:grid;
    height:100vh;
    grid-template-columns:26rem 1fr ;
    grid-template-rows: auto 1fr;
`

const StyledMain = styled.main `
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow:scroll;

    &::-webkit-scrollbar{
        display: none;
    }

`

export default function AppLayout() {
    return <StyledAppLayout>
            <Sidebar/>
            <Header/>
            <StyledMain>
                <Outlet/>
            </StyledMain>
        </StyledAppLayout>
}