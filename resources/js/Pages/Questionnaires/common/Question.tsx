import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { QuestionTypeEnum, QuestionTypeEnumDefinitions } from "@/Enums/QuestionTypeEnum";
import { AddIcon, ArrowDownIcon, ArrowUpIcon, CheckIcon, CopyIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Flex, FormControl, IconButton, InputGroup, InputLeftElement, InputRightElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { QuestionnairesPage } from "../types";
import { ValuesOf } from "@/types";
import { Alternative } from "./Alternative";

type QuestionProps = {
	field: FieldArrayWithId<QuestionnairesPage.TForm, "questions", "_id">;
	questionIndex: number;
	handleClone: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleUpdate: (data: QuestionnairesPage.TForm["questions"][number]) => void;
	handleMoveUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleMoveDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Question = ({ field, questionIndex, handleClone, handleRemove, handleUpdate, handleMoveUp, handleMoveDown }: QuestionProps) => {
	const { register, formState: { errors }, control, getValues, clearErrors } = useFormContext<QuestionnairesPage.TForm>();
	const { fields, append, remove, update } = useFieldArray({
		control,
		name: `questions.${questionIndex}.alternatives`,
		keyName: "_id",
	});

	const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

	const handleAddAlternative = (event: React.MouseEvent<HTMLElement>) => {
		clearErrors(`questions.${questionIndex}.alternatives`);
		append({
			description: '',
		});
	};

	const handleRemoveAlternative = (index: number) => {
		return (event: React.MouseEvent<HTMLElement>) => {
			const alternative = getValues(`questions.${questionIndex}.alternatives.${index}`);

			if (alternative.id) {
				update(index, {
					...alternative,
					deleted: true,
				});

				return;
			}

			remove(index);
		};

	};

	const handleChangeQuestionType = (value: ValuesOf<typeof QuestionTypeEnum>) => {
		return (event: React.MouseEvent<HTMLElement>) => {
			// Necessário fazer dessa forma para
			// pegar as alternativas aninhadas também
			const field = getValues(`questions.${questionIndex}`);

			if (value == field.type) return;

			clearErrors(`questions.${questionIndex}.alternatives`);

			if (value == QuestionTypeEnum.CHOICE || value == QuestionTypeEnum.MULTIPLE_CHOICE) {
				return handleUpdate({
					...field,
					type: value,
				});
			}

			return handleUpdate({
				...field,
				type: value,
				alternatives: [],
			});
		};
	};

	return (
		<Box border="1px solid" p="12px" borderColor={borderColor} borderRadius="8px" mb="12px">
			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} position="relative" zIndex={10}>
				<FormControl mb='12px' isInvalid={!!errors.questions?.[questionIndex]?.description}>
					<Label>Questão {questionIndex + 1}</Label>
					<InputGroup>
						<InputLeftElement>
							<Menu placement="right">
								<Tooltip label="Tipo de pergunta" hasArrow placement="top">
									<MenuButton as={IconButton} variant="outline" size="sm">
										<HamburgerIcon h={3} w={3} />
									</MenuButton>
								</Tooltip>
								<MenuList>
									{Object.entries(QuestionTypeEnumDefinitions).map(([value, label]) => (
										<MenuItem
											key={value}
											onClick={handleChangeQuestionType(Number(value) as ValuesOf<typeof QuestionTypeEnum>)}
											justifyContent="space-between">
											{label}
											{field.type == Number(value) && <CheckIcon color="green" />}
										</MenuItem>
									))}
								</MenuList>
							</Menu>
						</InputLeftElement>

						<TextInput {...register(`questions.${questionIndex}.description`)} placeholder="Descrição" p="0 80px 0 45px" />

						<InputRightElement w="80px" gap="4px">
							<Tooltip label="Clonar pergunta" hasArrow placement="top">
								<IconButton
									variant="outline"
									size="sm"
									onClick={handleClone}
									icon={<CopyIcon h={3} w={3} />}
									aria-label="Clonar pergunta" />
							</Tooltip>

							<Tooltip label="Remover pergunta" hasArrow placement="top">
								<IconButton
									variant="outline"
									size="sm"
									onClick={handleRemove}
									icon={<DeleteIcon h={3} w={3} />}
									aria-label="Remover pergunta" />
							</Tooltip>
						</InputRightElement>
					</InputGroup>
					<HelpBlockError name={`questions.${questionIndex}.description`} errors={errors} />
				</FormControl>
			</SimpleGrid>

			{(field.type == QuestionTypeEnum.CHOICE || field.type == QuestionTypeEnum.MULTIPLE_CHOICE) && (
				<>
					<Flex position="relative" justifyContent="flex-start" flexWrap="wrap" mx="-6px" zIndex={0} mb="12px">
						{fields.filter(field => !field.deleted).map((field, index) => (
							<Alternative key={field._id} questionIndex={questionIndex} alternativeIndex={index} handleRemove={handleRemoveAlternative(index)} />
						))}

						<Box px="6px" mb="12px">
							<Tooltip label="Adicionar alternativa" hasArrow placement="top">
								<IconButton
									mt="27px"
									onClick={handleAddAlternative}
									icon={<AddIcon h={3} w={3} />}
									aria-label="Adicionar alternativa"
									mr={2} />
							</Tooltip>
						</Box>
					</Flex>

					<FormControl isInvalid={!!errors?.questions?.[questionIndex]?.alternatives} mt="-12px" mb="12px">
						<HelpBlockError name={`questions.${questionIndex}.alternatives`} errors={errors} />
					</FormControl>
				</>
			)}

			<ButtonGroup variant='outline' size="sm" spacing={0}>
				<Tooltip label="Mover para cima" hasArrow placement="top">
					<IconButton
						onClick={handleMoveUp}
						icon={<ArrowUpIcon h={3} w={3} />}
						aria-label="Mover para cima"
						isDisabled={!handleMoveUp}
						borderRadius={"8px 0 0 8px"} />
				</Tooltip>

				<Tooltip label="Mover para baixo" hasArrow placement="top">
					<IconButton
						onClick={handleMoveDown}
						icon={<ArrowDownIcon h={3} w={3} />}
						aria-label="Mover para baixo"
						isDisabled={!handleMoveDown}
						borderRadius={"0 8px 8px 0"}
						ml="-2px" />
				</Tooltip>
			</ButtonGroup>
		</Box>
	);
};
