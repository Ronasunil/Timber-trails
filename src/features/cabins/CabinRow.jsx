import styled from "styled-components";

import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";


import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from "../../ui/Table";
import Menu from "../../ui/Menu";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;




export default function CabinRow({cabin}) {
  const {id, name, maxCapacity, price, discount, cabinImage} = cabin;

  const {isLoading, createCabin} = useCreateCabin();
  const {isDeleting, deleteCabin} = useDeleteCabin();

  const handleDuplication = function() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      price,
      discount,
      cabinImage
    }, {onSuccess:() => toast.success('Cabin created successfully')})
  }



  return( 

        <Table.Row>
          <Img src={cabinImage}/>
          <Cabin>{name}</Cabin>
          <div>Fits upto {maxCapacity} guests</div>
          <Price>${(+price).toFixed(2)}</Price>
          <Discount>{(+discount) ? `$${(+discount).toFixed(2)}` : "-" }</Discount>
          <div>
          <Menu.Item>
            <Modal> 

              <Menu.Toggle id={id}>
                <HiOutlineDotsVertical/>
              </Menu.Toggle>
              <Menu.List openId={id}>
                  <Modal.Open openName="edit">
                    <Menu.Button ><span>Edit</span><HiPencil/></Menu.Button>
                  </Modal.Open>
                  <Modal.Window openName="edit">
                    <CreateCabinForm func='edit' data={cabin} id={id}/>
                  </Modal.Window>
                
                  <Modal.Open openName="delete">
                    <Menu.Button ><span>Delete</span><HiTrash/></Menu.Button>
                  </Modal.Open>
                  <Modal.Window openName="delete">
                    <ConfirmDelete resourceName="cabins" onConfirm={() => deleteCabin(id)} disabled={isDeleting}/>
                  </Modal.Window>
                  <Menu.Button onClick={handleDuplication}><span>Copy</span><HiSquare2Stack/></Menu.Button>
              </Menu.List>
            </Modal> 

          </Menu.Item>
          </div>
        </Table.Row>


  )


}