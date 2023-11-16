import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";
import { PatientsPage } from "../types";

export const useSaveComment = (id: PatientsPage.AnswersGroup["id"]) => {
	return useMutation<boolean, ValidationError | Error, PatientsPage.TComentForm>({
		mutationKey: ['save.comment'],
		mutationFn: (data) => http.patch(route('answers.groups.update', id), { ...data }),
	});
}
