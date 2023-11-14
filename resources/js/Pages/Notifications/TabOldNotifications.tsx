import { Card } from "@/Components/Card";
import { TableContent } from "./TableContent";
import { useGetOldNotifications } from "./hooks/useGetOldNotifications";

export const TabOldNotifications = () => {
	return (
		<Card>
			<TableOldNotificationsContent />
		</Card>
	);
};

const TableOldNotificationsContent = () => {
	const queryResult = useGetOldNotifications();

	return <TableContent {...queryResult} />
}
