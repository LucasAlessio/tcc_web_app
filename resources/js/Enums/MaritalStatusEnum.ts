import { ValuesOf } from "@/types";

export const MaritalStatusEnum = {
	SINGLE: 'single',
	MARRIED: 'married',
	SEPARATED: 'separated',
	DIVORCED: 'divorced',
	WIDOWED: 'widowed',
} as const;

export const getDescriptions = () => ({
	[MaritalStatusEnum.SINGLE]: 'Solteiro',
	[MaritalStatusEnum.MARRIED]: 'Casado',
	[MaritalStatusEnum.SEPARATED]: 'Separado',
	[MaritalStatusEnum.DIVORCED]: 'Divorciado',
	[MaritalStatusEnum.WIDOWED]: 'Viúvo',
});

export const getDescription = (value: ValuesOf<typeof MaritalStatusEnum>): string => {
	return getDescriptions()[value] ?? "";
}
