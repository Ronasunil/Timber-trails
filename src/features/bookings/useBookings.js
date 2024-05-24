import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const prefetchBookings = function (
  queryClient,
  filterValue,
  sortValue,
  currentPage
) {
  queryClient.prefetchQuery({
    queryKey: ["bookings", filterValue, sortValue, currentPage],
    queryFn: () => getAllBookings(filterValue, sortValue, currentPage),
  });
};

export function useBookings(filterFn, sortFn) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = filterFn?.();
  const sortValue = sortFn?.();

  const currentPage = Number.parseInt(searchParams.get("page")) || 1;

  // prettier-ignore
  const {data, isError, isLoading, } =  useQuery({
        queryKey:['bookings', filterValue, sortValue, currentPage],
        queryFn:() => getAllBookings(filterValue, sortValue, currentPage),
      })

  const maxPage = Math.ceil(data?.count / PAGE_SIZE);

  if (currentPage < maxPage)
    prefetchBookings(queryClient, filterValue, sortValue, currentPage + 1);

  if (currentPage > 1)
    prefetchBookings(queryClient, filterValue, sortValue, currentPage - 1);

  return { bookings: data?.data, count: data?.count, isError, isLoading };
}
