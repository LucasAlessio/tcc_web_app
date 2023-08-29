import { ValuesOf } from "@/types";

export const QuestionTypeEnum = {
	SHORT_TEXT: 1,
	LONG_TEXT: 2,
	CHOICE: 3,
	MULTIPLE_CHOICE: 4,
} as const;

export const QuestionTypeEnumDefinitions: Record<ValuesOf<typeof QuestionTypeEnum>, string> = {
	[QuestionTypeEnum.SHORT_TEXT]: "Texto curto",
	[QuestionTypeEnum.LONG_TEXT]: "Texto longo",
	[QuestionTypeEnum.CHOICE]: "Múltipla escolha",
	[QuestionTypeEnum.MULTIPLE_CHOICE]: "Múltipla seleção"
};
