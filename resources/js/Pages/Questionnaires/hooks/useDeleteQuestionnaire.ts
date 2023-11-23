import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useDeleteQuestionnaire = () => {
	return useMutation<boolean, Error, number>({
		mutationKey: ['delete.questionnaire'],
		mutationFn: (id) => http.delete(route('questionnaires.destroy', id)),
	});
}
