import { useMutation } from "@tanstack/react-query";
import { createUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  // const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("User Created Succesfully ! ");
    },
    onError: () => {
      toast.error("User was not created ! ");
    },
  });

  return { isCreating, createUser };
}
