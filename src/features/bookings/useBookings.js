import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
// import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // const [searchParams] = useSearchParams();
  // const filterBy = searchParams.get("discount") || "all";
  // const sortBy = searchParams.get("sortBy");
  const {
    error,
    data: bookings,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
