import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { Label } from "@/Components/Label";
import { TextArea } from "@/Components/TextArea";
import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { date2br } from "@/utils/date";
import { Badge, Box, Button, Divider, FormControl, Grid, GridItem, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";
import { useGetAnswersGroup } from "../hooks/useGetAnswersGroup";
import { useGetAnswersGroups } from "../hooks/useGetAnswersGroups";
import { useSaveComment } from "../hooks/useSaveComment";
import { PatientsPage } from "../types";
import { useAnswersPatientContext } from "./context";

export const TabAnswers = ({ id }: { id: string; }) => {
	const { data, isLoading, isSuccess, isError, error } = useGetAnswersGroups(id);
	const [{ viewing, group }] = useAnswersPatientContext();

	return (
		<Grid templateColumns='repeat(4, 1fr)' gap={6}>
			<GridItem>
				<Card py="14px">
					{(() => {
						if (isLoading) {
							return <IndeterminatedCircularProgress />;
						}

						if (isError || !isSuccess) {
							return <Text>{error?.message ?? "Nenhum registro encontrado"}</Text>;
						}

						return <Groups groups={data} />;
					})()}
				</Card>
			</GridItem>

			{viewing && group && (
				<GridItem colSpan={3}>
					<AnswersContent id={group} />
				</GridItem>
			)}
		</Grid>
	);
};

const Groups = ({ groups }: { groups: PatientsPage.AnswersGroups; }) => {
	const [{ viewing, group }] = useAnswersPatientContext();

	if (!groups.length) {
		return <Text colorScheme="gray" fontStyle="italic" textAlign="center">Nenhum registro foi encontrado</Text>;
	}

	return (
		<>
			{groups.map((value) => (
				<Selector
					key={value.id}
					group={value.id}
					active={viewing && group == value.id}
					title={value.questionnaire.name}
					subtitle={date2br(value.created_at) ?? ""} />
			))}
		</>
	);
};

type SelectorProps = {
	group: PatientsPage.AnswersGroups[number]["id"];
	active: boolean;
	title: string;
	subtitle: string;
};

const Selector = ({ group, active, title, subtitle }: SelectorProps) => {
	const [, dispatch] = useAnswersPatientContext();

	const handleSelect = () => {
		dispatch({
			type: "view",
			group,
		});
	};

	return (
		<Button
			variant={active ? 'brand' : 'outline'}
			textAlign="left"
			display="block"
			h="auto"
			py="12px"
			my="6px"
			onClick={handleSelect}
			border={active ? "1px solid transparent" : undefined}
		>
			<Text textAlign="left" as="span" display="block">{title}</Text>
			<Text textAlign="left" as="span" fontWeight="normal">{subtitle}</Text>
		</Button>
	);
};

const AnswersContent = ({ id }: { id: number; }) => {
	const { data, isLoading, isSuccess, isError, error } = useGetAnswersGroup(id);

	return (
		<Card>
			{(() => {
				if (isLoading) {
					return <IndeterminatedCircularProgress />;
				}

				if (isError || !isSuccess) {
					return <Text>{error?.message ?? "Nenhum registro encontrado"}</Text>;
				}

				return <Answers group={data} />;
			})()}
		</Card>
	);
};

const Answers = ({ group }: { group: PatientsPage.AnswersGroup; }) => {
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', '0px 18px 40px rgba(10, 12, 15, 0.3)');

	const coeficiente = group.answers.reduce((acc, value) => {
		if (value.question.type == QuestionTypeEnum.CHOICE) {
			return acc + (value.alternative?.value ?? 0);
		}

		return acc;
	}, 0);

	return (
		<>
			<Text as="h2" fontSize="18px" fontWeight="bold" mb="14px">
				{group.questionnaire.name}
				&nbsp;
				<Badge variant='outline'>
					{date2br(group.created_at)}
				</Badge>
			</Text>

			<Text as="h3" fontSize="16px" fontWeight="bold" mb="24px">
				Coficiente calculado: {coeficiente} ({coeficiente * 2})
			</Text>

			{group.answers.map((answer, index) => (
				<Card
					key={answer.id}
					shadow={cardShadow}
					mb={index == group.answers.length - 1 ? "0px" : "24px"}
				>
					<Text as="p" fontWeight="bold">{answer.question.description}</Text>

					{[QuestionTypeEnum.CHOICE, QuestionTypeEnum.MULTIPLE_CHOICE].some(v => v == answer.question.type) ? (
						<Text as="p">{answer.alternative?.description}
							&nbsp;
							<Badge variant='outline'>
								{answer.alternative?.value}
							</Badge>
						</Text>
					) : (
						<Text as="p">a</Text>
					)}
				</Card>
			))}

			<Divider my="24px" />

			<Comment group={group} />
		</>
	);
};

const Comment = ({ group: { id, psychologist_comment } }: { group: PatientsPage.AnswersGroup; }) => {
	const { register, formState: { errors }, handleSubmit, setError } = useForm<PatientsPage.TComentForm>({
		values: {
			psychologist_comment,
		}
	});

	const { mutate, isLoading } = useSaveComment(id);

	const toast = useToast();
	const { alert } = useModals();

	const submit = handleSubmit((formData) => {
		mutate(formData, {
			onSuccess(response) {
				toast({
					title: 'Comentário salvo',
					description: "As informações foram salvas com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<PatientsPage.TComentForm>, {
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

	return (
		<form onSubmit={submit}>
			<SimpleGrid columns={{ base: 1 }}>
				<FormControl mb='12px' isInvalid={!!errors.psychologist_comment}>
					<Label>Comentário</Label>
					<TextArea {...register("psychologist_comment")} placeholder="Comentário" minH={"300px"} />
					<HelpBlockError name="psychologist_comment" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<Box mt="12px">
				<Button variant="brand" type="submit" isLoading={isLoading} loadingText="Salvando">Salvar</Button>
			</Box>
		</form>
	)
}
