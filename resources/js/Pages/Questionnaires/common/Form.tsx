import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { TextArea } from "@/Components/TextArea";
import { TextInput } from "@/Components/TextInput";
import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { useIsQuestionnaireAnswerd, useToastQuestionnaireBlocked } from "../hooks/useIsEditingQuestionnaire";
import { QuestionnairesPage } from "../types";
import { Question } from "./Question";

type FormProps = {
	isSubmitting: boolean
	onSubmit: SubmitHandler<QuestionnairesPage.TForm>
}

export const Form = ({ isSubmitting, onSubmit }: FormProps) => {
	const { register, handleSubmit, formState: { errors }, control, clearErrors, getValues } = useFormContext<QuestionnairesPage.TForm>();
	const { fields, append, insert, remove, update, swap } = useFieldArray({
		control,
		name: "questions",
		keyName: "_id",
	});
	const isAnswerd = useIsQuestionnaireAnswerd();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(onSubmit);

	const toast = useToastQuestionnaireBlocked();

	const handleAddQuestion = () => {
		clearErrors('questions');

		if (isAnswerd) {
			toast("Não é possível adicionar questões em instrumentos já respondidos.");
			return;
		};

		append({
			type: QuestionTypeEnum.CHOICE,
			description: "",
			alternatives: [],
		});
	};

	const handleCloneQuestion = (index: number) => {
		return (event: React.MouseEvent<HTMLElement>) => {
			if (isAnswerd) {
				toast("Não é possível adicionar questões em instrumentos já respondidos.");
				return;
			};

			// Necessário fazer dessa forma para
			// pegar as alternativas aninhadas também
			const question = getValues(`questions.${index}`);

			if (question.type == QuestionTypeEnum.CHOICE || question.type == QuestionTypeEnum.MULTIPLE_CHOICE) {
				insert(index + 1, {
					...question,
					id: 0,
					alternatives: question.alternatives.map(v => ({ ...v, id: 0, })),
				});

				return;
			}

			insert(index + 1, {
				...question,
				id: 0,
			});
		};
	};

	const handleUpdateQuestion = (index: number) => {
		return (data: QuestionnairesPage.TForm["questions"][number]) => {
			update(index, data);
		};
	};

	const handleRemoveQuestion = (index: number) => {
		return (event: React.MouseEvent<HTMLElement>) => {
			if (isAnswerd) {
				toast("Não é possível remover questões de instrumentos já respondidos");
				return;
			};

			// Necessário fazer dessa forma para
			// pegar as alternativas aninhadas também
			// const question = getValues(`questions.${index}`);

			// if (question.id) {
			// 	update(index, {
			// 		...question,
			// 		deleted: true,
			// 	});
			// 	return;
			// }

			remove(index);
		};
	};

	const handleMoveUpQuestion = (index: number) => {
		if (index == 0) return undefined;

		return (event: React.MouseEvent<HTMLElement>) => {
			swap(index, index - 1);
		};
	};

	const handleMoveDownQuestion = (index: number) => {
		if (index == fields.length - 1) return undefined;

		return (event: React.MouseEvent<HTMLElement>) => {
			swap(index, index + 1);
		};
	};

	return (
		<>
			<Heading as='h3' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
				Cadastro de questionários
			</Heading>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
				<Text size="sm">Insira as informações do questionário.</Text>
			</SimpleGrid>

			{isAnswerd && <Alert status='info' mt="24px">
				<AlertIcon />
				<AlertTitle>Este instrumento já foi respondido</AlertTitle>
				<AlertDescription>Ações como inclusão ou remoção de perguntas e alternativas foram desabilitadas.</AlertDescription>
			</Alert>}

			<form onSubmit={submit}>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<FormControl mt="24px" mb='12px' isInvalid={!!errors.name}>
						<Label>Nome</Label>
						<TextInput {...register("name")} placeholder="Nome" />
						<HelpBlockError name="name" errors={errors} />
					</FormControl>
				</SimpleGrid>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<FormControl mb='12px' isInvalid={!!errors.description}>
						<Label>Descrição</Label>
						<TextArea {...register("description")} placeholder="Descrição" />
						<HelpBlockError name="description" errors={errors} />
					</FormControl>
				</SimpleGrid>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<FormControl mb='12px' isInvalid={!!errors.recurrence}>
						<Label>Período de dias entre respostas</Label>
						<NumberInput variant="main" min={1} max={1000} maxW="200px">
							<NumberInputField {...register("recurrence")} placeholder="Período de dias entre respostas" />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<HelpBlockError name="recurrence" errors={errors} />
					</FormControl>
				</SimpleGrid>

				{fields.map((field, index) => {
					return <Question
						key={field._id}
						field={field}
						questionIndex={index}
						handleClone={handleCloneQuestion(index)}
						handleRemove={handleRemoveQuestion(index)}
						handleUpdate={handleUpdateQuestion(index)}
						handleMoveUp={handleMoveUpQuestion(index)}
						handleMoveDown={handleMoveDownQuestion(index)} />
				})}

				{!isAnswerd && <FormControl mb='12px' isInvalid={!!errors?.questions}>
					<Button onClick={handleAddQuestion}>Adicionar questão</Button>
					<HelpBlockError name={`questions`} errors={errors} />
				</FormControl>}


				<Box mt="12px">
					<Button variant="brand" type="submit" isLoading={isSubmitting} loadingText="Salvando">Salvar</Button>
				</Box>
			</form>
		</>
	);
};
