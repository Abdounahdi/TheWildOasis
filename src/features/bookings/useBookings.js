import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import {
  getBooking,
  getBookings,
  getBookingsAfterDate,
  getStaysTodayActivity,
} from "../../services/apiBookings";
import { getToday, getTodayMinus } from "../../utils/helpers";

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

export function useBookingsAfterDate() {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!searchParams.get("last")) {
    searchParams.set("last", 7);
    setSearchParams(searchParams);
  }

  const date = getTodayMinus(searchParams.get("last"));

  const {
    error,
    data: bookings,
    isLoading,
  } = useQuery({
    queryKey: ["bookingsAfterDate", date],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { isLoading, error, bookings };
}

export function useBookingsToday() {
  const {
    error,
    data: bookingsToday,
    isLoading,
  } = useQuery({
    queryKey: ["bookingsToday"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, error, bookingsToday };
}
