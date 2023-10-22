import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { PatientsPage } from "../types";

export const useGetQuestionnaires = (id?: string) => {
	return useQuery<PatientsPage.QuestionnairesControls, Error>(
		["get.questionnaires.controls", id],
		() => http.get(route('questionnaires.controls.edit', id)),
		{
			enabled: !!id,
			staleTime: Infinity,
			cacheTime: Infinity,
		}
	);
}
