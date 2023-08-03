import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { useMutation } from "react-query";

export const useLogout = () => {
	return useMutation<void, ValidationExceptionType | Error, {}>({
		mutationKey: ["mutation.logout"],
		mutationFn: () => http.post(route('logout')),
	});
}
