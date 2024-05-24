import { useSearchParams } from 'react-router-dom'
import StyledSelect from '../ui/Select'


function Sort({options, value}) {
    const [searchParams, setSearchParams] = useSearchParams();


    const handleChange = function(e) {
       
        searchParams.set('sortBy', e.target.value);
        searchParams.set('page', 1);
        setSearchParams(searchParams);
    }

    return <StyledSelect onChange={handleChange} value={value}>
              {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
           </StyledSelect>
}
  
  
  
  export default Sort