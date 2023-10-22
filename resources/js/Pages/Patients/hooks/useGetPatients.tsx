import { PaginatedResult } from "@/types/utils";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { usePatientsFilters } from "./usePatientsFilters";
import { PatientsPage } from "../types";

export const useGetPatients = () => {
	const { filters } = usePatientsFilters();

	return useQuery<PaginatedResult<PatientsPage.Patient>, Error>(
		["get.patients", filters],
		() => http.get(route('patients.index'), {
			params: filters,
		})
	);
}
