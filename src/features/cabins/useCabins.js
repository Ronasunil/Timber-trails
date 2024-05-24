import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // prettier-ignore
  const{data:cabins, isError, isLoading}  = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isError, isLoading };
}
