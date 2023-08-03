import { PageProps } from "@/types";
import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useLogin = () => {
	return useMutation<PageProps, ValidationExceptionType | Error, any>({
		mutationKey: ["mutation.login"],
		mutationFn: (data) => http.post(route('login'), { ...data }),
	});
}
