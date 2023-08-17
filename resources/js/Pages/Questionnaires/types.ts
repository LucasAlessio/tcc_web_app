import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum"

export declare module QuestionnairesPage {
	type Filters = {
		search: string,
		page: number,
		limit: number,
	}

	type TAddForm = {
		name: string,
		description: string,
		recurrence: string,
		questions: (
			{
				id?: number,
				description: string,
			} & ({
				type: typeof QuestionTypeEnum.SHORT_TEXT | typeof QuestionTypeEnum.LONG_TEXT
				alternatives: [],
			} | {
				type: typeof QuestionTypeEnum.CHOICE,
				alternatives: {
					id?: number,
					description: string,
				}[],
			})
		)[],
	}
}
