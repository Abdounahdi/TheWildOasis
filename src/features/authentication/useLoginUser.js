import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useContext } from "react";
import { authContext } from "./authContext";

export function useLoginUser() {
  const context = useContext(authContext);
  const signIn = context.signIn;
  const { isLoading: isLogging, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.user.user_metadata.full_name} ! `);
      signIn(data?.data?.user);
    },
    onError: () => {
      toast.error("Oops , check your Login details ! ");
    },
  });

  return { isLogging, loginUser };
}
