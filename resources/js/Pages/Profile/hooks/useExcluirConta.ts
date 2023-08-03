import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useExcluirConta = () => {
	return useMutation<void, ValidationExceptionType | Error, object>({
		mutationKey: ["mutation.excluir.conta"],
		mutationFn: (data) => {
			return http.delete(route('profile.destroy'), { data })
		},
	});
}
