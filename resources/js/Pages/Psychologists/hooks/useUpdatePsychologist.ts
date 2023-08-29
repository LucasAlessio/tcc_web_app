import { http } from "@/utils/http"
import { useMutation } from "react-query"
import { PsychologistsPage } from "../types";
import { ValidationError } from "yup";

export const useUpdatePsychologist = (id: string | number) => {
	return useMutation<boolean, ValidationError | Error, PsychologistsPage.TAddForm>({
		mutationKey: ['update.psychologist'],
		mutationFn: (data) => http.put(route('psychologists.update', id), { ...data }),
	});
}
