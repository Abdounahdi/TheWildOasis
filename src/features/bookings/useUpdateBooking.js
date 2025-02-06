import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as updateBookingApi } from "../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateBooking } = useMutation({
    mutationFn: updateBookingApi,
    onSuccess: () => {
      toast.success("Booking updated Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("Booking was not updated !");
    },
  });

  return { isUpdating, updateBooking };
}
