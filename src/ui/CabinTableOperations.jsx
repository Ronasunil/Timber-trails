import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Sort from "./Sort";
import TableOperations from "./TableOperations"



function CabinTableOperations() {
    const [searchParam] = useSearchParams();

    const sortByValue = searchParam.get('sortBy') || ''
    return <TableOperations>
                <Filter paramValue="discount" filters={[{value:"all", label:'All'}, {value: "with-discount", label:"With discount"}, {value: "without-discount", label:"Without discount"}]}/>
                <Sort value={sortByValue} options={[{value:'name-asc',  label:'Sort by name (A-Z)'}, {value:'name-desc', label: 'Sort by name (Z-A)'}, {value: 'price-asc', label: 'Sort price by (Low first)'},{value: 'price-desc', label:'Sort price by (High first)'}, {value:'maxCapacity-asc', label:'Sort capacity by (Low first)'}, {value:'maxCapacity-desc', label:'Sort capacity by (High first)'}]}/>
           </TableOperations>
}


export default CabinTableOperations;




