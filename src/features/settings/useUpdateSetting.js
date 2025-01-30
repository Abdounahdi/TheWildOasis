import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting edited Succesfully ! ");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("Setting was not edited ! ");
    },
  });

  return { isUpdating, updateSetting };
}
