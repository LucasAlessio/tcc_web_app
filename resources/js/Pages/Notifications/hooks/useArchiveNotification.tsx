import { useAuth2 } from "@/Contexts/Auth2";
import { http } from "@/utils/http";
import { useMutation, useQueryClient } from "react-query";
import { NotificationsPage } from "../types";

export const useArchiveNotification = () => {
	const queryClient = useQueryClient();
	const { clearNotifications } = useAuth2();

	return useMutation<void, Error, NotificationsPage.Notification["id"]>({
		mutationFn: (id) => http.delete(route('notifications.destroy', id)),
		onSuccess(_, id) {
			const data = queryClient.getQueryData<NotificationsPage.Notification[]>(["get.new.notifications"]);

			if (!data) return;

			const newData = data.filter(v => v.id != id);
			queryClient.setQueryData(["get.new.notifications"], newData);
			queryClient.invalidateQueries(["get.old.notifications"]);

			if (!newData.length) {
				clearNotifications();
			}
		}
	});
}
