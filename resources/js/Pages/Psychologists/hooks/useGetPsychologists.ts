import { PaginatedResult } from "@/types/utils";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { usePsychologistsFilters } from "./usePsychologistsFilters";
import { PsychologistsPage } from "../types";

export const useGetPsychologists = () => {
	const { filters } = usePsychologistsFilters();

	return useQuery<PaginatedResult<PsychologistsPage.TPsychologist>, Error>(
		["get.psychologists", filters],
		() => http.get(route('psychologists.index'), {
			params: filters,
		})
	);
}
