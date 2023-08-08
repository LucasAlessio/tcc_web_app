import { FiltersProvider } from "@/Components/Filter";
import { Outlet } from "react-router-dom";
import { PsychologistsPage } from "./types";

export const defaultFilters: PsychologistsPage.Filters = {
	search: "",
	page: 1,
	limit: 10,
}

export const PsychologistsProvider = () => {
	return (
		<FiltersProvider defaultValues={defaultFilters}>
			<Outlet />
		</FiltersProvider>
	)
}
