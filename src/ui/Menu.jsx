import { createContext, useContext, useState } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;


export const MenuContext = createContext()

function Menu({children}) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({});

  const open = setOpenId;
  const close = () => setOpenId('');
  const handleSetPosition = (value) => setPosition(value);

  return <MenuContext.Provider value={{openId, open, close, handleSetPosition, position}}>{children}</MenuContext.Provider>
}


function Item({children}) {
  return <StyledMenu>{children}</StyledMenu>
}

function Toggle({children, id}) {
  const {openId, close, open, handleSetPosition} = useContext(MenuContext);

  function handleClick(e) {
    const {top, left} = e.target.getBoundingClientRect();
    console.log(e.target);

    (openId === "" || openId !== id) ? open(id) : close();

    handleSetPosition({x: window.innerWidth -  left, y:top})

  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>
}


function List({children, openId:id}) {

  const {openId, position} = useContext(MenuContext);

  if(openId !== id) return;

  return <StyledList position={position}>
            {children}
        </StyledList>
}


function Button({children, onClick, disabled}) {

  const handleClick = function() {
    onClick?.()

  }
  return<StyledButton disabled={disabled} onClick={handleClick}>{children}</StyledButton>
}

Menu.Button = Button;
Menu.Item = Item;
Menu.Toggle = Toggle;
Menu.List = List;




export default Menu;







