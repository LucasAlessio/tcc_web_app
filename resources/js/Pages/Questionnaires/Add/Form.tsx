import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { TextArea } from "@/Components/TextArea";
import { TextInput } from "@/Components/TextInput";
import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { Box, Button, FormControl, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Path, useFieldArray, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateQuestionnaire } from "../hooks/useCreateQuestionnaire";
import { QuestionnairesPage } from "../types";
import { Question } from "./Question";

export const Form = () => {
	const { register, handleSubmit, formState: { errors }, setError, control, clearErrors, getValues } = useFormContext<QuestionnairesPage.TAddForm>();
	const { fields, append, insert, remove, update, swap } = useFieldArray({
		control,
		name: "questions",
		keyName: "_id",
	});

	const { mutate, isLoading } = useCreateQuestionnaire();
	const navigate = useNavigate();

	const { alert } = useModals();
	const toast = useToast();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(formData => {
		mutate(formData, {
			onSuccess(response) {
				toast({
					title: 'Instrumento cadastrado',
					description: "O instrumento foi cadastrado com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});

				navigate('/questionarios');
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<QuestionnairesPage.TAddForm>, {
							message: errors[0],
							type: "validate",
						});
					});

					return;
				}

				return alert({
					title: "Ocorreu um erro",
					message: e.message,
				});
			}
		});
	});

	const handleAddQuestion = () => {
		clearErrors('questions');

		append({
			type: QuestionTypeEnum.CHOICE,
			description: "",
			alternatives: [],
		});
	};

	const handleCloneQuestion = (index: number) => {
		return (event: React.MouseEvent<HTMLElement>) => {
			// Necessário fazer dessa forma para
			// pegar as alternativas aninhadas também
			const question = getValues(`questions.${index}`);

			insert(index + 1, {
				...question,
			});
		};
	};

	const handleUpdateQuestion = (index: number) => {
		return (data: QuestionnairesPage.TAddForm["questions"][number]) => {
			update(index, data);
		};
	};

	const handleRemoveQuestion = (index: number) => {
		return (event: React.MouseEvent<HTMLElement>) => {
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
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Card>
				<Heading as='h3' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Cadastro de questionários
				</Heading>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<Text size="sm">Insira as informações do questionário.</Text>
				</SimpleGrid>

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

					{fields.map((field, index) => (
						<Question
							key={field._id}
							field={field}
							questionIndex={index}
							handleClone={handleCloneQuestion(index)}
							handleRemove={handleRemoveQuestion(index)}
							handleUpdate={handleUpdateQuestion(index)}
							handleMoveUp={handleMoveUpQuestion(index)}
							handleMoveDown={handleMoveDownQuestion(index)} />
					))}

					<FormControl mb='12px' isInvalid={!!errors?.questions}>
						<Button onClick={handleAddQuestion}>Adicionar questão</Button>
						<HelpBlockError name={`questions`} errors={errors} />
					</FormControl>


					<Box mt="12px">
						<Button variant="brand" type="submit" isLoading={isLoading} loadingText="Salvando">Salvar</Button>
					</Box>
				</form>
			</Card>
		</SimpleGrid>
	);
};