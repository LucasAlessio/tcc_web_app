export declare module PsychologistsPage {
	type Filters = {
		search: string,
		page: number,
		limit: number,
	}

	type TAddForm = {
		name: string,
		email: string,
		password: string,
	}

	type TPsychologist = {
		id: number,
		name: string,
		email: string,
		created_at: string,
	}
}
