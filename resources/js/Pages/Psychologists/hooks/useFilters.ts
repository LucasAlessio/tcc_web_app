import { useFilterContext } from "@/Components/Filter";
import { PsychologistsPage } from "../types";

export const useFilters = () => {
	return useFilterContext<PsychologistsPage.Filters>();
}
