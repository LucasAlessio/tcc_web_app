import { PaginatedResult } from "@/types/utils";
import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { NotificationsPage } from "../types";
import { useOldNotificationsFilters } from "./useOldNotificationsFilters";

export const useGetOldNotifications = () => {
	const { filters } = useOldNotificationsFilters();

	return useQuery<PaginatedResult<NotificationsPage.Notification>, Error>(
		["get.old.notifications", filters],
		() => http.get(route('notifications.index', {
			...filters,
			old: true,
		})),
	);
}
