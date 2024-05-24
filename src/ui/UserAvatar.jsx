import styled from "styled-components"

import {useUser} from '../features/authentication/useUser'
import { useNavigate } from "react-router-dom"

const UserImg = styled.img`
    width:30px;
    height:30px;
    border-radius:50%;
`

const User = styled.div`
    display:flex;
    align-items:center;
    cursor: pointer;
    gap:10px;
`

function UserAvatar() {
    const navigate = useNavigate()
    const {user} = useUser();
    
    if(!user) return null;

    const {user:{user_metadata:{avatar, fullname}}} = user

    return <User onClick={() => navigate('/account')}>
            <UserImg src={avatar || 'default-user.jpg'}/>
            <span>{fullname}</span>
           </User>
        
}


export default UserAvatar