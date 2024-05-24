import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const date = Number.parseInt(searchParams.get("last")) || 7;

  //   prettier-ignore
  const { data:bookings, isLoading, isError } = useQuery({
    queryKey: ["bookings", date],
    queryFn: () => getStaysAfterDate(date),
  });

  return { bookings, isLoading, isError };
}
