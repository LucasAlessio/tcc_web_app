import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { date2br } from "@/utils/date";
import { convertMarkupBold2Html } from "@/utils/text";
import { ViewIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { MdArchive } from "react-icons/md";
import { UseQueryResult } from "react-query";
import { useArchiveNotification } from "./hooks/useArchiveNotification";
import { useHandleViewNotification } from "./hooks/useHandleViewNotification";
import { NotificationsPage } from "./types";

export const TableContent = (props: UseQueryResult<NotificationsPage.Notification[], Error>) => {
	const { data, isFetching, isSuccess, isError, error } = props;

	if (isError) {
		return error?.message;
	}

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
							<NotificationTableTr key={notification.id} {...notification} />
						));
					})()}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

const NotificationTableTr = (props: NotificationsPage.Notification) => {
	const { id, title, description, created_at, viewed_at } = props;

	const { mutate, isLoading } = useArchiveNotification();

	const handleNavigate = useHandleViewNotification();
	const handleArchive = () => {
		mutate(id);
	}

	return (
		<Tr>
			<Td><b>{title}</b>: <span dangerouslySetInnerHTML={{ __html: convertMarkupBold2Html(description) }} /></Td>
			<Td whiteSpace="nowrap">{date2br(created_at)}</Td>
			<Td whiteSpace="nowrap">
				<Tooltip label="Visualizar" hasArrow placement="top">
					<IconButton
						size='sm'
						icon={<ViewIcon h={3} w={3} />}
						aria-label="Visualizar"
						onClick={handleNavigate(props)} />
				</Tooltip>
				{" "}
				{!viewed_at && (
					isLoading ? (
						<Box display="inline-block" h="32px" w="32px" lineHeight="32px" textAlign="center">
							<IndeterminatedCircularProgress size="15px" />
						</Box>
					) : (
						<Tooltip label="Arquivar" hasArrow placement="top">
							<IconButton
								size='sm'
								icon={<MdArchive h={3} w={3} />}
								aria-label="Arquivar"
								onClick={handleArchive} />
						</Tooltip>
					)
				)}
			</Td>
		</Tr>
	)
}
