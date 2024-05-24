import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const {logout, isLoggingout} = useLogout();

    return <ButtonIcon disabled={isLoggingout} onClick={logout}>
            <HiArrowRightStartOnRectangle/>
           <span>
                {isLoggingout ? <SpinnerMini/> : ''}
           </span>
          </ButtonIcon>
}


export default Logout;