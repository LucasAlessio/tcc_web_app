import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useStyleConfig } from "@chakra-ui/react";
import { MdChecklist, MdPerson, MdSnippetFolder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { TabPatient } from "./TabPatient";
import { TabQuestionnaires } from "./TabQuestionnaires";
import { AnswersPatientProvider } from "./context";
import { TabAnswers } from "./TabAnswers";

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
