import { PaginatedResult } from "@/types/utils";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { PatientsPage } from "../types";

export const useGetPatient = (id?: string) => {
	return useQuery<PatientsPage.Patient, Error>(
		["get.Patients", id],
		() => http.get(route('patients.show', id)),
		{
			enabled: !!id,
			staleTime: 0,
			cacheTime: 0,
		}
	);
}
