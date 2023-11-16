import { useNavigate } from "react-router-dom";
import { NotificationsPage } from "../types";
import { useArchiveNotification } from "./useArchiveNotification";

export const useHandleViewNotification = () => {
	const { mutate } = useArchiveNotification();

	const navigate = useNavigate();

	return (notification: NotificationsPage.Notification) => (event: React.MouseEvent<HTMLElement>) => {
		navigate(notification.url);

		if (notification.viewed_at) return;
		mutate(notification.id);
	}
}
