import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";
import { QuestionnairesPage } from "../types";

export const useExportAnswers = () => {
	return useMutation<string, ValidationError | Error, QuestionnairesPage.TExportForm>({
		mutationKey: ['export.answers'],
		mutationFn: (data) => http.post(route('export.answers.store'), { ...data }),
	});
}
