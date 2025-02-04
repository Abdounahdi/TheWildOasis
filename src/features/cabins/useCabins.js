import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy");
  const {
    error,
    data: cabins,
    isLoading,
  } = useQuery({
    queryKey: ["cabins", filterBy, sortBy],
    queryFn: () => getCabins(filterBy, sortBy),
  });

  return { isLoading, error, cabins };
}
