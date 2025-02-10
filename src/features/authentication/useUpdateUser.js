import { useMutation } from "@tanstack/react-query";
import { updateUserApi, updateUserPassApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const {
    isLoading: isUpdating,
    mutateAsync: updateUser,
    data,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success(`User settings were updated successfully! `);
    },
    onError: () => {
      toast.error("Oops , could not be updated ! ");
    },
  });

  return { isUpdating, updateUser, data };
}

export function useUpdatePass() {
  const { isLoading: isUpdating, mutate: updatePass } = useMutation({
    mutationFn: updateUserPassApi,
    onSuccess: () => {
      toast.success(`Your password was updated successfully! `);
    },
    onError: () => {
      toast.error("Oops , could not be updated ! ");
    },
  });

  return { isUpdating, updatePass };
}
