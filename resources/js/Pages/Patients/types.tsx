import { FamilyIncomeEnum } from "@/Enums/FamilyIncomeEnum";
import { GenderEnum } from "@/Enums/GenderEnum";
import { MaritalStatusEnum } from "@/Enums/MaritalStatusEnum";
import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum";
import { SchoolingEnum } from "@/Enums/SchoolingEnum";
import { ValuesOf } from "@/types";

export declare module PatientsPage {
	type Filters = {
		search: string,
		page: number,
		limit: number,
	}

	type Patient = {
		id: number;
		name: string;
		email: string;
		created_at: string;
		patient: {
			gender: ValuesOf<typeof GenderEnum>;
			occupation: string;
			marital_status: ValuesOf<typeof MaritalStatusEnum>;
			family_income: ValuesOf<typeof FamilyIncomeEnum>;
			schooling: ValuesOf<typeof SchoolingEnum>;
			family_with_chronic_illnesses: boolean;
			family_with_psychiatric_disorders: boolean;
			created_at: string;
			updated_at: string;
			psychologist: {
				id: string,
				name: string;
				email: string;
			};
		};
	}

	type QuestionnairesControls = {
		id: number,
		name: string,
		active: boolean,
	}[];

	type QuestionnairesForm = {
		questionnaires: {
			id: number,
			active: boolean,
		}[],
	}

	type AnswersGroups = {
		id: number,
		psycholigist_comment?: string,
		created_at: string,
		updated_at: string,
		questionnaire: {
			id: number,
			name: string,
		},
	}[];

	type AnswersGroup = {
		id: number,
		created_at: string,
		questionnaire: {
			id: number,
			name: string,
		},
		psychologist_comment?: string,
		answers: ({
			id: number,
		} & ({
			comment: string,
			question: {
				id: number,
				description: string,
				type: typeof QuestionTypeEnum.SHORT_TEXT | typeof QuestionTypeEnum.LONG_TEXT,
			},
			alternative: undefined,
		} | {
			comment: undefined,
			question: {
				id: number,
				description: string,
				type: typeof QuestionTypeEnum.CHOICE | typeof QuestionTypeEnum.MULTIPLE_CHOICE,
			},
			alternative: {
				id: number,
				description: string,
				value: number,
				question_id: number,
				created_at: string,
				updated_at: string,
			},
		}))[],
	};

	type TComentForm = Pick<AnswersGroup, "psychologist_comment">;
}
