import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { useGetQuestionnaires } from "../hooks/useGetQuestionnaires";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { date2br } from "@/utils/date";
import { Link } from "react-router-dom";

export const TableContent = () => {
	const { data, isFetching, isSuccess, isError, error } = useGetQuestionnaires();

	if (isError) {
		return error?.message;
	}

	return (
		<TableContainer overflowX="auto" whiteSpace="nowrap">
			<Table>
				<Thead>
					<Tr>
						<Th>Nome</Th>
						<Th>Descrição</Th>
						<Th>Criado por</Th>
						<Th>Criado em</Th>
						<Th w="120px">Ações</Th>
					</Tr>
				</Thead>

				<Tbody>
					{(() => {
						if (isFetching) {
							return (
								<Tr>
									<Td colSpan={4} textAlign="center">
										<IndeterminatedCircularProgress />
									</Td>
								</Tr>
							);
						}

						if (!isSuccess) {
							return <></>;
						}

						if (data.total === 0) {
							return (
								<Tr>
									<Td colSpan={4} textAlign="center">
										<Text colorScheme="gray" fontStyle="italic">Nenhum registro foi encontrado</Text>
									</Td>
								</Tr>
							);
						}

						return <>
							{data.data.map((value) => (
								<Tr key={value.id}>
									<Td>{value.name}</Td>
									<Td>{value.description}</Td>
									<Td>{value.psychologist.name}</Td>
									<Td>{date2br(value.created_at)}</Td>
									<Td w="120px">
										<Tooltip label="Exportar respostas" hasArrow placement="top">
											<IconButton
												as={Link}
												to={`/questionarios/exportar/${value.id}`}
												size='sm'
												icon={<DownloadIcon h={3} w={3} />}
												aria-label="Exportar respostas" />
										</Tooltip>
										{" | "}
										<Tooltip label="Editar" hasArrow placement="top">
											<IconButton
												as={Link}
												to={`/questionarios/editar/${value.id}`}
												size='sm'
												icon={<EditIcon h={3} w={3} />}
												aria-label="Editar" />
										</Tooltip>
										{" "}
										<Tooltip label="Excluir" hasArrow placement="top">
											<IconButton
												size='sm'
												icon={<DeleteIcon h={3} w={3} />}
												aria-label="Excluir" />
										</Tooltip>
									</Td>
								</Tr>
							))}
						</>;
					})()}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
