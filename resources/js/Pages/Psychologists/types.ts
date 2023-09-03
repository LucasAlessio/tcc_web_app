export declare module PsychologistsPage {
	type Filters = {
		search: string,
		page: number,
		limit: number,
	}

	type TForm = {
		name: string,
		email: string,
		password: string,
		psychologist: {
			id?: number,
			registration_number: string,
		}
	}

	type TPsychologist = {
		id: number,
		name: string,
		email: string,
		created_at: string,
		psychologist?: {
			registration_number: string,
		}
	}
}
