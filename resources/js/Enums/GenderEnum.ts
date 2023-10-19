import { ValuesOf } from "@/types";

export const GenderEnum = {
	MALE: "male",
	FEMALE: "female",
} as const;

export const getDescriptions = () => ({
	[GenderEnum.MALE]: "Masculino",
	[GenderEnum.FEMALE]: "Feminino",
});

export const getDescription = (value: ValuesOf<typeof GenderEnum>): string => {
	return getDescriptions()[value] ?? "";
}
