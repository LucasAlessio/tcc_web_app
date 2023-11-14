import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { MdArchive } from "react-icons/md";
import { Link } from "react-router-dom";
import { NotificationsPage } from "./types";
import { convertMarkupBold2Html } from "@/utils/text";
import { date2br } from "@/utils/date";
import { UseQueryResult } from "react-query";
import { useHandleViewNotification } from "./hooks/useHandleViewNotification";

export const TableContent = (props: UseQueryResult<NotificationsPage.Notification[], Error>) => {
	const { data, isFetching, isSuccess, isError, error } = props;

	if (isError) {
		return error?.message;
	}

	const handleNavigate = useHandleViewNotification();

	return (
		<TableContainer overflowX="auto" whiteSpace="nowrap">
			<Table>
				<Thead>
					<Tr>
						<Th>Descrição</Th>
						<Th w="5px">Data</Th>
						<Th w="5px">Ações</Th>
					</Tr>
				</Thead>
				<Tbody>
					{(() => {
						if (isFetching) {
							return (
								<Tr>
									<Td colSpan={3} textAlign="center">
										<IndeterminatedCircularProgress />
									</Td>
								</Tr>
							);
						}

						if (!isSuccess) {
							return <></>;
						}

						if (data.length === 0) {
							return (
								<Tr>
									<Td colSpan={3} textAlign="center">
										<Text colorScheme="gray" fontStyle="italic">Nenhum registro foi encontrado</Text>
									</Td>
								</Tr>
							);
						}

						return data.map((notification) => (
							<Tr key={notification.id}>
								<Td><b>{notification.title}</b>: <span dangerouslySetInnerHTML={{ __html: convertMarkupBold2Html(notification.description) }} /></Td>
								<Td whiteSpace="nowrap">{date2br(notification.created_at)}</Td>
								<Td whiteSpace="nowrap">
									<Tooltip label="Visualizar" hasArrow placement="top">
										<IconButton
											size='sm'
											icon={<ViewIcon h={3} w={3} />}
											aria-label="Visualizar"
											onClick={handleNavigate(notification)} />
									</Tooltip>
									{" "}
									{!notification.viewed_at && <Tooltip label="Arquivar" hasArrow placement="top">
										<IconButton
											size='sm'
											icon={<MdArchive h={3} w={3} />}
											aria-label="Arquivar"
											onClick={() => { }} />
									</Tooltip>}
								</Td>
							</Tr>
						));
					})()}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
