import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function usePreviousBooking() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("last") || 7;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", date],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { bookings, isLoading };
}
