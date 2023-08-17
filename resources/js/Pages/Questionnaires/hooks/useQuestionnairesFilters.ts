import { useFilterContext } from "@/Components/Filter";
import { QuestionnairesPage } from "../types";

export const useQuestionnairesFilters = () => {
	return useFilterContext<QuestionnairesPage.Filters>();
}
