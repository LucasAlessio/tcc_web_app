import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum"

export declare module QuestionnairesPage {
	type Filters = {
		search: string,
		page: number,
		limit: number,
	}

	type TForm = {
		name: string,
		description: string,
		recurrence: string,
		questions: (
			{
				id?: number,
				description: string,
				deleted?: boolean,
			} & ({
				type: typeof QuestionTypeEnum.SHORT_TEXT | typeof QuestionTypeEnum.LONG_TEXT
				alternatives: [],
			} | {
				type: typeof QuestionTypeEnum.CHOICE | typeof QuestionTypeEnum.MULTIPLE_CHOICE,
				alternatives: {
					id?: number,
					description: string,
					deleted?: boolean,
				}[],
			})
		)[],
	}

	type Questionnaire = {
		id: number,
		name: string,
		description: string,
		recurrence: string,
		questions?: (
			{
				id: number,
				description: string,
			} & ({
				type: typeof QuestionTypeEnum.SHORT_TEXT | typeof QuestionTypeEnum.LONG_TEXT
				alternatives: [],
			} | {
				type: typeof QuestionTypeEnum.CHOICE | typeof QuestionTypeEnum.MULTIPLE_CHOICE,
				alternatives: {
					id: number,
					description: string,
				}[],
			})
		)[],
		psychologist: {
			name: string,
		}
		created_at: string,
	}

	type TExportForm = {
		id: number,
		startDate: string,
		endDate: string,
		responsesQuantity: number,
		format: "rows" | "columns",
		withPatientsData: boolean
	}
}
