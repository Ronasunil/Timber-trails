import styled from "styled-components";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const FullPage = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100dvh;
    background-color: var(--color-grey-50);
    
`

function ProtectedRoute({children}) {
    const navigate = useNavigate()
    // check for any authenticated user
    const {user, isLoading} = useUser()

   

    // loading when getting data;
    useEffect(function() {
        if(!isLoading && user?.user?.role !== 'authenticated') {
            console.log('happened')
            navigate('/login');
        }
    },[isLoading, user, navigate])

    if(isLoading) return <FullPage><Spinner/></FullPage>

    // if no user redirect to login
    return children;
}


export default ProtectedRoute;