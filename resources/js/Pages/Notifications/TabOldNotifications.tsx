import { Card } from "@/Components/Card";
import { FiltersProvider } from "@/Components/Filter";
import { Pagination } from "@/Components/Pagination";
import { PaginatedResult } from "@/types/utils";
import { UseQueryResult } from "react-query";
import { TableContent } from "./TableContent";
import { useGetOldNotifications } from "./hooks/useGetOldNotifications";
import { useOldNotificationsFilters } from "./hooks/useOldNotificationsFilters";
import { NotificationsPage } from "./types";

const defaultFilters: NotificationsPage.FiltersOldNotifications = {
	page: 1,
	limit: 10,
}

export const TabOldNotifications = () => {
	return (
		<FiltersProvider defaultValues={defaultFilters}>
			<TableOldNotificationsContent />
		</FiltersProvider>
	);
};

const TableOldNotificationsContent = () => {
	const queryResult = useGetOldNotifications();

	const { data: _data, ...queryResultRest } = queryResult;
	const data: NotificationsPage.Notification[] = _data?.data ?? [];

	const newQueryResult = {
		...queryResultRest,
		data,
	} as UseQueryResult<NotificationsPage.Notification[], Error>;

	return (
		<>
			<Card>
				<TableContent {...newQueryResult} />
			</Card>

			<TabPagination {...queryResult} />
		</>
	);
}

const TabPagination = (props: UseQueryResult<PaginatedResult<NotificationsPage.Notification>, Error>) => {
	const { form: { setValue }, filters } = useOldNotificationsFilters();

	return (
		<Pagination
			size={filters.limit}
			page={filters.page}
			setPage={(page) => setValue("page", page, true)}
			setPageSize={(size) => setValue("limit", size, true)}
			total={props.data?.total || 1} />
	)
}
