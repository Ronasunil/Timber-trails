import styled from "styled-components";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";


const Container = styled.div`
  display:flex;
  flex-direction: column;
  gap:2rem;

`

function Dashboard() {
  return (
    <Container>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <Filter  paramValue="last" filters={[{label: "Last 7 days", value:7}, {label:"Last 30 days", value: 30,}, {label:"last 90 days", value:90}]}/>
    </Row>
    <Row>
      <DashboardLayout/>
    </Row>     
    </Container>
    

  );
}

export default Dashboard;
