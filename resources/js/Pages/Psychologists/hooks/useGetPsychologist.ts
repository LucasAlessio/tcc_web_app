import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { PsychologistsPage } from "../types";

export const useGetPsychologist = (id?: string) => {
	return useQuery<PsychologistsPage.TPsychologist, Error>(
		["get.psychologist", id],
		() => http.get(route('psychologists.edit', id)),
		{
			enabled: !!id,
			staleTime: 0,
			cacheTime: 0,
		}
	);
}
