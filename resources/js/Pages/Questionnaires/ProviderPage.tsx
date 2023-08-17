import { FiltersProvider } from "@/Components/Filter";
import { Outlet } from "react-router-dom";
import { QuestionnairesPage } from "./types";

export const defaultFilters: QuestionnairesPage.Filters = {
	search: "",
	page: 1,
	limit: 10,
}

export const QuestionnairesProvider = () => {
	return (
		<FiltersProvider defaultValues={defaultFilters}>
			<Outlet />
		</FiltersProvider>
	)
}
