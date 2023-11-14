import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { NotificationsPage } from "../types";

export const useGetNewNotifications = (enabled: boolean) => {
	return useQuery<NotificationsPage.Notification[], Error>(
		["get.new.notifications"],
		() => http.get(route('notifications.index')),
		{
			enabled,
			cacheTime: Infinity,
			staleTime: Infinity,
		}
	);
}
