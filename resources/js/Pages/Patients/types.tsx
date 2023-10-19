import { FamilyIncomeEnum } from "@/Enums/FamilyIncomeEnum";
import { GenderEnum } from "@/Enums/GenderEnum";
import { MaritalStatusEnum } from "@/Enums/MaritalStatusEnum";
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
}
