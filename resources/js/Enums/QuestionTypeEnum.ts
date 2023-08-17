export const QuestionTypeEnum = {
	SHORT_TEXT: 1,
	LONG_TEXT: 2,
	CHOICE: 3,
} as const;

export const QuestionTypeEnumDefinitions: Record<typeof QuestionTypeEnum[keyof typeof QuestionTypeEnum], string> = {
	[QuestionTypeEnum.SHORT_TEXT]: "Texto curto",
	[QuestionTypeEnum.LONG_TEXT]: "Texto longo",
	[QuestionTypeEnum.CHOICE]: "Múltipla escolha",
};
