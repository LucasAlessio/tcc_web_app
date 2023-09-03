import { http } from "@/utils/http";
import { useMutation } from "react-query";
import { ValidationError } from "yup";
import { PsychologistsPage } from "../types";

export const useCreatePsychologist = () => {
	return useMutation<boolean, ValidationError | Error, PsychologistsPage.TForm>({
		mutationKey: ['create.psychologist'],
		mutationFn: (data) => http.post(route('psychologists.store'), { ...data }),
	});
}
