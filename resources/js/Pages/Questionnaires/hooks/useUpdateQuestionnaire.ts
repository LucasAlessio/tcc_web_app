import { QuestionnairesPage } from "@/Pages/Questionnaires/types";
import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";

export const useUpdateQuestionnaire = (id: string | number) => {
	return useMutation<boolean, ValidationError | Error, QuestionnairesPage.TAddForm>({
		mutationKey: ['update.questionnaire'],
		mutationFn: (data) => http.put(route('questionnaires.update', id), { ...data }),
	});
}
