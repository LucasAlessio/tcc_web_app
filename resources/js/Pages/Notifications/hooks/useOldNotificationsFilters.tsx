import { useFilterContext } from "@/Components/Filter";
import { NotificationsPage } from "../types";

export const useOldNotificationsFilters = () => {
	return useFilterContext<NotificationsPage.FiltersOldNotifications>();
}
