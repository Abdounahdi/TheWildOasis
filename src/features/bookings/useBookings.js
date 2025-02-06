import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import {
  getBooking,
  getBookings,
} from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy");

  const pageNum = searchParams.get("page") || 1;

  const { error, data, isLoading } = useQuery({
    queryKey: ["bookings", filterBy, sortBy, pageNum],
    queryFn: () => getBookings(filterBy, sortBy, pageNum),
  });

  return { isLoading, error, data };
}

export function useBookingId(id) {
  const {
    error,
    data: booking,
    isLoading,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { isLoading, error, booking };
}
