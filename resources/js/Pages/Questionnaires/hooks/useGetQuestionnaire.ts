import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { QuestionnairesPage } from "../types";

export const useGetQuestionnaire = (id?: string) => {
	return useQuery<QuestionnairesPage.Questionnaire, Error>(
		["get.questionnaire", id],
		() => http.get(route('questionnaires.edit', id)),
		{
			enabled: !!id,
			staleTime: 0,
			cacheTime: 0,
		}
	);
}
