import { PageProps } from "@/types";
import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useAlterarSenha = () => {
	return useMutation<PageProps, ValidationExceptionType | Error, object>({
		mutationKey: ["mutation.alterar.senha"],
		mutationFn: (data) => http.put(route('password.update'), { ...data }),
	});
}
