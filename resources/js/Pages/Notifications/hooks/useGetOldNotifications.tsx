import { http } from "@/utils/http";
import { useQuery } from "react-query";
import { NotificationsPage } from "../types";

export const useGetOldNotifications = () => {
	return useQuery<NotificationsPage.Notification[], Error>(
		["get.old.notifications"],
		() => http.get(route('notifications.index', {
			old: true,
		})),
	);
}
