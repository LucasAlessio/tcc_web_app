import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { date2br } from "@/utils/date";
import { Badge, Button, Grid, GridItem, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useStyleConfig } from "@chakra-ui/react";
import { MdChecklist, MdPerson, MdSnippetFolder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGetAnswersGroups } from "../hooks/useGetAnswersGroups";
import { PatientsPage } from "../types";
import { TabPatient } from "./TabPatient";
import { TabQuestionnaires } from "./TabQuestionnaires";
import { AnswersPatientProvider, useAnswersPatientContext } from "./context";
import { useGetAnswersGroup } from "../hooks/useGetAnswersGroup";
import { QuestionTypeEnum } from "@/Enums/QuestionTypeEnum";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();
	const { bg } = useStyleConfig('Card');

	const patientId = id ?? "";

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Tabs variant="soft-rounded">
				<TabList>
					<Tab _selected={{ bg }}><MdPerson /> &nbsp; Informações do paciente</Tab>
					<Tab _selected={{ bg }}><MdChecklist /> &nbsp; Controle de instrumentos</Tab>
					<Tab _selected={{ bg }}><MdSnippetFolder /> &nbsp; Respostas</Tab>
				</TabList>
				<TabPanels>
					<TabPanel px={0}>
						<TabPatient id={patientId} />
					</TabPanel>
					<TabPanel px={0}>
						<TabQuestionnaires id={patientId} />
					</TabPanel>
					<TabPanel px={0}>
						<AnswersPatientProvider>
							<TabAnswers id={patientId} />
						</AnswersPatientProvider>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</SimpleGrid>
	);
};

const TabAnswers = ({ id }: { id: string }) => {
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
		</Grid >
	);
}

const Groups = ({ groups }: { groups: PatientsPage.AnswersGroups }) => {
	const [{ viewing, group }] = useAnswersPatientContext();

	if (!groups.length) {
		return <Text colorScheme="gray" fontStyle="italic" textAlign="center">Nenhum registro foi encontrado</Text>
	}

	return (
		<>
			{groups.map((value) => (
				<Selector
					key={value.id}
					group={value.id}
					active={viewing && group == value.id}
					title={value.questionnaire.name}
					subtitle={date2br(value.created_at)}
				/>
			))}
		</>
	);
}

type SelectorProps = {
	group: PatientsPage.AnswersGroups[number]["id"],
	active: boolean,
	title: string,
	subtitle: string
}

const Selector = ({ group, active, title, subtitle }: SelectorProps) => {
	const [, dispatch] = useAnswersPatientContext();

	const handleSelect = () => {
		dispatch({
			type: "view",
			group,
		});
	}

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
	)
}

const AnswersContent = ({ id }: { id: number }) => {
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
}

const Answers = ({ group }: { group: PatientsPage.AnswersGroup }) => {

	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', '0px 18px 40px rgba(10, 12, 15, 0.3)');

	return (
		<>
			<Text as="h2" fontSize="18px" fontWeight="bold" mb="24px">
				{group.questionnaire.name}
				&nbsp;
				<Badge variant='outline'>
					{date2br(group.created_at)}
				</Badge>
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
				</Card >
			))}
		</>
	);
}
