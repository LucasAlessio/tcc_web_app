import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";
import { QuestionnairesPage } from "../types";

export const useCreateQuestionnaire = () => {
	return useMutation<boolean, ValidationError | Error, QuestionnairesPage.TAddForm>({
		mutationKey: ['create.questionnaire'],
		mutationFn: (data) => http.post(route('questionnaires.store'), { ...data }),
	});
}
