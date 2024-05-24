import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  // prettier-ignore
  const {data:user, isLoading, isError} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false
  });

  return { user, isLoading, isError };
}
