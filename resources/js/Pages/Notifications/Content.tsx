import { Tab, TabList, TabPanel, TabPanels, Tabs, useStyleConfig } from "@chakra-ui/react";
import { MdArchive, MdCircleNotifications } from "react-icons/md";
import { TabNewNotifications } from "./TabNewNotifications";
import { TabOldNotifications } from "./TabOldNotifications";

export const Content = () => {
	const { bg } = useStyleConfig('Card');

	return (
		<>
			<Tabs variant="soft-rounded" mb='20px'>
				<TabList>
					<Tab _selected={{ bg }}><MdCircleNotifications /> &nbsp; Novas notificações</Tab>
					<Tab _selected={{ bg }}><MdArchive /> &nbsp; Arquivadas</Tab>
				</TabList>
				<TabPanels>
					<TabPanel px={0}>
						<TabNewNotifications />
					</TabPanel>
					<TabPanel px={0}>
						<TabOldNotifications />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};
