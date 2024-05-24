import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkinBooking, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, updationObj }) => {
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...updationObj,
      });
    },
    onSuccess: () => {
      toast.success(`Booking  has successfully checked-in`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.refetchQueries(["todayActivity"], { active: true });

      navigate("/");
    },

    onError: (err) => {
      console.log(err);
      toast.error(`Can't mark booking as checked-in `);
    },
  });

  return { checkinBooking, isCheckingIn };
}
