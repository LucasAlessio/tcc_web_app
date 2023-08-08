import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useDeletePsychologist = () => {
	return useMutation<boolean, Error, number>({
		mutationKey: ['delete.psychologist'],
		mutationFn: (id) => http.delete(route('psychologists.destroy', id)),
	});
}
