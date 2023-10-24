import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { PatientsPage } from "../types";

export const useGetAnswersGroups = (id?: string) => {
	return useQuery<PatientsPage.AnswersGroups, Error>(
		["get.answers.groups", id],
		() => http.get(route('answers.groups.index', id)),
		{
			enabled: !!id,
		}
	);
}
