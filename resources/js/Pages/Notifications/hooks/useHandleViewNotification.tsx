import { useMutation, useQueryClient } from "react-query"
import { NotificationsPage } from "../types"
import { useNavigate } from "react-router-dom";
import { http } from "@/utils/http";
import { useAuth2 } from "@/Contexts/Auth2";

export const useHandleViewNotification = () => {
	const queryClient = useQueryClient();
	const { clearNotifications } = useAuth2();

	const { mutate } = useMutation<void, Error, NotificationsPage.Notification["id"]>({
		mutationFn: (id) => http.delete(route('notifications.destroy', id)),
		onSuccess(_, id) {
			const data = queryClient.getQueryData<NotificationsPage.Notification[]>(["get.new.notifications"]);

			if (!data) return;

			const newData = data.filter(v => v.id != id);
			queryClient.setQueryData(["get.new.notifications"], newData);

			if (!newData.length) {
				clearNotifications();
			}
		}
	});

	const navigate = useNavigate();

	return (notification: NotificationsPage.Notification) => (event: React.MouseEvent<HTMLElement>) => {
		navigate(notification.url);

		if (notification.viewed_at) return;
		mutate(notification.id);
	}
}
