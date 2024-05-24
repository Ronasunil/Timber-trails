import styled from "styled-components";
import { useState } from "react";


import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Model from '../ui/Modal'
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../ui/AddCabin";
import CabinTableOperations from "../ui/CabinTableOperations";



const Container = styled.div `
  
  display:flex;
  flex-direction:column;
  gap:2rem;


`

function Cabins() {

  
  return (
    <Container>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row type="vertical">
        <CabinTable/>
      </Row>
      <AddCabin/>
    </Container>
  );
}

export default Cabins;
