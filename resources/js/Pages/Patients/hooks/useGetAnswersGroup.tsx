import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { PatientsPage } from "../types";

export const useGetAnswersGroup = (id: number) => {
	return useQuery<PatientsPage.AnswersGroup, Error>(
		["get.answers.group", id],
		() => http.get(route('answers.groups.show', id)),
		{
			enabled: !!id,
			cacheTime: Infinity,
			staleTime: Infinity,
		}
	);
}
