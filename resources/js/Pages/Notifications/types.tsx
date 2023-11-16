export declare module NotificationsPage {
	type Notification = {
		id: number,
		title: string,
		description: string,
		url: string,
		viewed_at: string,
		created_at: string,
		updated_at: string,
	}

	type FiltersOldNotifications = {
		page: number,
		limit: number,
	}
}
