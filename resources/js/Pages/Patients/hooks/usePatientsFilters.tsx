import { useFilterContext } from "@/Components/Filter";
import { PatientsPage } from "../types";

export const usePatientsFilters = () => {
	return useFilterContext<PatientsPage.Filters>();
}
