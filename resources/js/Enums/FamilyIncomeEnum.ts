import { ValuesOf } from "@/types";

export const FamilyIncomeEnum = {
	UP_TO_3_MINIMUM_WAGES: 1,
	FROM_4_TO_6_MINIMUM_WAGES: 2,
	FROM_7_TO_11_MINIMUM_WAGES: 3,
	ABOVE_11_MINIMUM_WAGES: 4,
} as const;

export const getDescriptions = () => ({
	[FamilyIncomeEnum.UP_TO_3_MINIMUM_WAGES]: 'Até 3 salários mínimos',
	[FamilyIncomeEnum.FROM_4_TO_6_MINIMUM_WAGES]: 'De 4 a 6 salários mínimos',
	[FamilyIncomeEnum.FROM_7_TO_11_MINIMUM_WAGES]: 'De 7 a 11 salários mínimos',
	[FamilyIncomeEnum.ABOVE_11_MINIMUM_WAGES]: 'Acime de 11 salários mínimos',
});

export const getDescription = (value: ValuesOf<typeof FamilyIncomeEnum>): string => {
	return getDescriptions()[value] ?? "";
}
