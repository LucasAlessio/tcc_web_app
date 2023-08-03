import { PageProps, User } from "@/types";
import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useSalvarInformacoesPerfil = () => {
	return useMutation<User, ValidationExceptionType | Error, object>({
		mutationKey: ["mutation.salvar.informacoes.perfil"],
		mutationFn: (data) => http.patch(route('profile.update'), { ...data }),
	});
}
