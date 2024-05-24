import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Successfully checkout booking #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });

      queryClient.invalidateQueries({
        queryKey: ["todayActivity"],
      });
    },

    onError: (err) => {
      toast.error(`Can't checkout booking`);
      console.error(err);
    },
  });

  return { checkout, isCheckingOut };
}
