import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Sort from './Sort'
import TableOperations from "./TableOperations"



function BookingsTableOperations() {
    const [searchParams] = useSearchParams();
    const sortValue = searchParams.get('sortBy') || '';
    return <TableOperations>
                <Filter  paramValue="status" filters={[{value:"all", label:'All'}, {value:"checked-in", label:"Checked in"}, {value: "checked-out", label: "Checked out"}, {value: "unconfirmed", label:"Unconfirmed"}]}/>
                <Sort value={sortValue} options={[{value:"totalPrice-asc", label:"Sort by amount (low first)"}, {value:"totalPrice-desc", label:"Sort by amount (high first)"}, {value: "startDate-asc", label:"Sort by date (earliest)"}, {value: "startDate-desc", label: "Sort by date (recent)"}]}/>
            </TableOperations>
}


export default BookingsTableOperations;