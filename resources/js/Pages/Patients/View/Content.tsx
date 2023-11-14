import { PatientPageTabs } from "@/Enums/PatientPageTabs";
import { ValuesOf } from "@/types";
import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useStyleConfig } from "@chakra-ui/react";
import { MdChecklist, MdPerson, MdSnippetFolder } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { TabAnswers } from "./TabAnswers";
import { TabPatient } from "./TabPatient";
import { TabQuestionnaires } from "./TabQuestionnaires";
import { AnswersPatientProvider } from "./context";
import { useEffect, useState } from "react";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();

	const [searchParams, setSearchParams] = useSearchParams();
	const tab = searchParams.get('tab');

	const [tabIndex, setTabIndex] = useState(() => getIndexByTab(tab));

	const { bg } = useStyleConfig('Card');
	const patientId = id ?? "";

	const handleChangeTab = (index: number) => {
		setTabIndex(index);
	}

	useEffect(() => {
		if (!searchParams.size) return;

		handleChangeTab(getIndexByTab(tab));
		setSearchParams({});
	}, [searchParams]);

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Tabs variant="soft-rounded" index={tabIndex} onChange={handleChangeTab}>
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

function getIndexByTab(tab: string | null): number {
	const tabs = {
		[PatientPageTabs.DATA]: 0,
		[PatientPageTabs.QUESTIONNAIRES]: 1,
		[PatientPageTabs.ANSWERS]: 2,
	}

	return tab ? tabs[tab as ValuesOf<typeof PatientPageTabs>] ?? 0 : 0;
}
