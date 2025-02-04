import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("discount") || "all";
  const {
    error,
    data: cabins,
    isLoading,
  } = useQuery({
    queryKey: ["cabins", filterBy],
    queryFn: () => getCabins(filterBy),
  });

  return { isLoading, error, cabins };
}
