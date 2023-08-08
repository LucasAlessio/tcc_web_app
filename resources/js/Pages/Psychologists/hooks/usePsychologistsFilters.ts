import { useFilterContext } from "@/Components/Filter";
import { PsychologistsPage } from "../types";

export const usePsychologistsFilters = () => {
	return useFilterContext<PsychologistsPage.Filters>();
}
