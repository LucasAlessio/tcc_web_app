import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { date2br } from "@/utils/date";
import { Link } from "react-router-dom";
import { useGetPatients } from "../hooks/useGetPatients";

export const TableContent = () => {
	const { data, isFetching, isSuccess, isError, error } = useGetPatients();

	if (isError) {
		return error?.message;
	}

	return (
		<TableContainer overflowX="auto" whiteSpace="nowrap">
			<Table>
				<Thead>
					<Tr>
						<Th>Nome</Th>
						<Th>E-mail</Th>
						<Th>Psicólogo</Th>
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
									<Td colSpan={5} textAlign="center">
										<Text colorScheme="gray" fontStyle="italic">Nenhum registro foi encontrado</Text>
									</Td>
								</Tr>
							);
						}

						return <>
							{data.data.map((value) => (
								<Tr key={value.id}>
									<Td>{value.name}</Td>
									<Td>{value.email}</Td>
									<Td>{value?.patient?.psychologist.name}</Td>
									<Td>{date2br(value.created_at)}</Td>
									<Td w="120px">
										<Tooltip label="Visualizar" hasArrow placement="top">
											<IconButton
												as={Link}
												to={`/pacientes/visualizar/${value.id}`}
												type="submit"
												size='sm'
												icon={<ViewIcon h={3} w={3} />}
												aria-label="Editar" />
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
