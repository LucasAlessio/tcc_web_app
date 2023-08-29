import { PaginatedResult } from "@/types/utils";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { useQuestionnairesFilters } from "./useQuestionnairesFilters";
import { QuestionnairesPage } from "../types";

export const useGetQuestionnaires = () => {
	const { filters } = useQuestionnairesFilters();

	return useQuery<PaginatedResult<QuestionnairesPage.Questionnaire>, Error>(
		["get.questionnaires", filters],
		() => http.get(route('questionnaires.index'), {
			params: filters,
		})
	);
}
