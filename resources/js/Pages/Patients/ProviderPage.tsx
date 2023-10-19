import { FiltersProvider } from "@/Components/Filter";
import { Outlet } from "react-router-dom";
import { PatientsPage } from "./types";

export const defaultFilters: PatientsPage.Filters = {
	search: "",
	page: 1,
	limit: 10,
}

export const PatientsProvider = () => {
	return (
		<FiltersProvider defaultValues={defaultFilters}>
			<Outlet />
		</FiltersProvider>
	)
}
