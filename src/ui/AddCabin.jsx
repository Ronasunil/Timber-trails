import { useState } from "react";
import Button from "./Button";
import Modal from './Modal'
import CreateCabinForm from "../features/cabins/CreateCabinForm";



// function AddCabin() {
//     const [isModelOpen, setIsModelOpen] = useState(false);

//     return(
//         <>
//         <Button onClick={() => setIsModelOpen(true) } size="medium" style={{alignSelf:"flex-start"}} variation="primary">Add new Cabin</Button>
//         {isModelOpen && <Model  handleClose={() => setIsModelOpen(false)}><CreateCabinForm  handleClose={() => setIsModelOpen(false)}  type="model"/></Model>}
//         </>        
//     )
    
// }



// add cabin with compound component pattern
function AddCabin() {
    return(<Modal>
            <Modal.Open>
                <Button size="medium" variation="primary">Add to cabin</Button>
            </Modal.Open>
            <Modal.Window>
                <CreateCabinForm type="modal"/>
            </Modal.Window>
    
         </Modal>)
}



export default AddCabin;