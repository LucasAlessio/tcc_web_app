import { Card } from "@/Components/Card";
import { Pagination } from "@/Components/Pagination";
import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, SimpleGrid, Tab, TabList, Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tooltip, Tr, useStyleConfig } from "@chakra-ui/react";
import { MdArchive, MdCircleNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { Page } from "../Page";

export const Notificacoes = () => {
	const { bg } = useStyleConfig('Card');

	return (
		<Page
			title="Notificações"
			startPath="/notificacoes">

			<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
				<Tabs variant="soft-rounded">
					<TabList>
						<Tab _selected={{ bg }}><MdCircleNotifications /> &nbsp; Novas notificações</Tab>
						<Tab _selected={{ bg }}><MdArchive /> &nbsp; Arquivadas</Tab>
					</TabList>
				</Tabs>
			</SimpleGrid>

			<Content />
		</Page >
	);
};


export const Content = () => {
	return (
		<>
			<Card>
				<TableContainer overflowX="auto" whiteSpace="nowrap">
					<Table>
						<Thead>
							<Tr>
								<Th>Descrição</Th>
								<Th>Data</Th>
								<Th w="120px">Ações</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr key={1}>
								<Td>Lucas realizou um novo envio para o questionário COBRA</Td>
								<Td>05/11/2023 18:35</Td>
								<Td w="120px">
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
											as={Link}
											to={`/psicologos/editar`}
											type="submit"
											size='sm'
											icon={<ViewIcon h={3} w={3} />}
											aria-label="Editar" />
									</Tooltip>
									{" "}
									<Tooltip label="Excluir" hasArrow placement="top">
										<IconButton
											type="submit"
											size='sm'
											icon={<MdArchive h={3} w={3} />}
											aria-label="Excluir"
											onClick={() => { }} />
									</Tooltip>
								</Td>
							</Tr>
							<Tr key={2}>
								<Td><b>Enrico Assis realizou um novo envio para o questionário PHQ-9</b></Td>
								<Td>03/11/2023 10:28</Td>
								<Td w="120px">
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
											as={Link}
											to={`/psicologos/editar`}
											type="submit"
											size='sm'
											icon={<ViewIcon h={3} w={3} />}
											aria-label="Editar" />
									</Tooltip>
									{" "}
									<Tooltip label="Excluir" hasArrow placement="top">
										<IconButton
											type="submit"
											size='sm'
											icon={<MdArchive h={3} w={3} />}
											aria-label="Excluir"
											onClick={() => { }} />
									</Tooltip>
								</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Card>

			{<Pagination
				size={2}
				page={1}
				setPage={(page) => { }}
				setPageSize={(size) => { }}
				total={2} />}
		</>
	);
};
