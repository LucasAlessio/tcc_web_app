import { Card } from "@/Components/Card";
import { TableContent } from "./TableContent";
import { useGetNewNotifications } from "./hooks/useGetNewNotifications";

export const TabNewNotifications = () => {
	return (
		<Card>
			<TableNewNotificationsContent />
		</Card>
	);
};

const TableNewNotificationsContent = () => {
	const queryResult = useGetNewNotifications(true);

	return <TableContent {...queryResult} />
}
