import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";
import { PatientsPage } from "../types";

export const useSaveQuestionnaires = (id: string) => {
	return useMutation<boolean, ValidationError | Error, PatientsPage.QuestionnairesForm>({
		mutationKey: ['save.questionnaires.controls'],
		mutationFn: (data) => http.post(route('questionnaires.controls.update', id), { ...data }),
	});
}
