import { ValuesOf } from "@/types";

export const SchoolingEnum = {
	INCOMPLETE_ELEMENTARY_EDUCATION: 1,
	COMPLETE_PRIMARY_EDUCATION: 2,
	INCOMPLETE_HIGH_SCHOOL: 3,
	COMPLETE_HIGH_SCHOOL: 4,
	INCOMPLETE_HIGHER_EDUCATION: 5,
	COMPLETE_HIGHER_EDUCATION: 6,
	POSTGRADUATE: 7,
} as const;

export const getDescriptions = () => ({
	[SchoolingEnum.INCOMPLETE_ELEMENTARY_EDUCATION]: "Ensino fundamental incompleto",
	[SchoolingEnum.COMPLETE_PRIMARY_EDUCATION]: "Ensino fundamento completo",
	[SchoolingEnum.INCOMPLETE_HIGH_SCHOOL]: "Ensino médio incompleto",
	[SchoolingEnum.COMPLETE_HIGH_SCHOOL]: "Ensino médio completo",
	[SchoolingEnum.INCOMPLETE_HIGHER_EDUCATION]: "Ensino superior incompleto",
	[SchoolingEnum.COMPLETE_HIGHER_EDUCATION]: "Ensino superior completo",
	[SchoolingEnum.POSTGRADUATE]: "Pós-graduação",
});

export const getDescription = (value: ValuesOf<typeof SchoolingEnum>): string => {
	return getDescriptions()[value] ?? "";
}
