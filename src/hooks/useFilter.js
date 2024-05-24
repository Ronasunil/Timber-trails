import { useSearchParams } from "react-router-dom";

const useFilter = function (paramName) {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get(paramName) || "all";

  return filterValue;
};

export default useFilter;
