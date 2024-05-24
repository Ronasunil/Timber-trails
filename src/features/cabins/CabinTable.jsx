
import Spinner from '../../ui/Spinner';
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menu from "../../ui/Menu";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";





export default function CabinTable() {

  const {cabins, isLoading, isError} = useCabins();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('discount') || 'all';
  const sortByValue = searchParams.get('sortBy') || '';
  let filteredData, sortedData;

  if(isLoading) return <Spinner/>

  // filtering
  if(filterValue === 'all') filteredData = cabins;
  if(filterValue === 'with-discount') filteredData = cabins.filter(cabin => cabin.discount > 0)
  if(filterValue === 'without-discount') filteredData = cabins.filter(cabin => cabin.discount === 0);


  // sorting
  const[field, sortOrder] = sortByValue.split('-');
  sortedData = filteredData.sort((a, b) => sortOrder ==='asc' ? a[field] - b[field] : b[field] - a[field])
  
  // console.log(sortedData, sortOrder, field, 'lkkkkk')

  return <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table" as="header">
            <Table.Header role="row">
              <div></div>
              <div>Cabin</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>
              <div></div>
            </Table.Header>
            <Menu>
              <Table.Body>
                {sortedData.map(cabin => <CabinRow cabin={cabin} key={cabin.id}/>)}
              </Table.Body>
            </Menu>
            
        </Table>
}
