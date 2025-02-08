import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useLoginUser() {

  const { isLoading: isLogging, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      toast.success("Welcome ! ");
    },
    onError: () => {
      toast.error("Oops , check your Login details ! ");
    },
  });

  return { isLogging, loginUser };
}
