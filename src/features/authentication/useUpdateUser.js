import { useMutation } from "@tanstack/react-query";
import { updateUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const { isLoading: isUpdating, mutateAsync : updateUser , data } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      toast.success(`User settings updated successfully! `);
    },
    onError: () => {
      toast.error("Oops , could not be updated ! ");
    },
  });

  return { isUpdating, updateUser , data};
}
