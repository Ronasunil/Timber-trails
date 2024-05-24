import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


// function Modal({children, handleClose}) {
//   return (<Overlay>
//             <StyledModal>
//               <Button onClick={handleClose}><HiXMark/></Button>
//               {children}
//             </StyledModal>
//           </Overlay>)

// }


const ModalContext = createContext();


function Window ({children, openName}) {
  const {isModelOpen, closeModal} = useContext(ModalContext);


  if( openName !== isModelOpen) return;

  return createPortal (<Overlay  onClick={closeModal}>
                        <StyledModal onClick={(e) => e.stopPropagation()}>
                        <Button onClick={closeModal}><HiXMark/></Button>
                          {cloneElement(children, {handleClose: closeModal})}
                        </StyledModal>
                      </Overlay>, document.body)
}


function Modal({children}) {
  const [isModelOpen, setIsModelOpen] = useState('');

  const closeModal = () => setIsModelOpen(false);
  const openModal = (name) => setIsModelOpen(name);
  return <ModalContext.Provider value={{isModelOpen, closeModal, openModal}}>{children}</ModalContext.Provider>

}


function Open({children, openName}) {
  const {openModal} = useContext(ModalContext);
  
  return <div>{cloneElement(children, {onClick:() => openModal(openName)}) }</div>
}

Modal.Open = Open;
Modal.Window = Window
export default Modal;