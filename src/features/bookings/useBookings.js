import { useQuery } from "@tanstack/react-query";
import {
  getBooking,
  getBookings,
  getBookingsLength,
} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

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

export function useBookingsLength() {
  const {
    error,
    data: bookingsLength,
    isLoading,
  } = useQuery({
    queryKey: ["bookingsLength"],
    queryFn: getBookingsLength,
  });

  return { isLoading, error, bookingsLength };
}
