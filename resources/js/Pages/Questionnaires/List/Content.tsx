import { Card } from "@/Components/Card";
import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import useModals from "@/Modals";
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, InputGroup, InputRightElement, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../Components/Pagination";
import { defaultFilters } from "../ProviderPage";
import { useQuestionnairesFilters } from "../hooks/useQuestionnairesFilters";
import { useGetQuestionnaires } from "../hooks/useGetQuestionnaires";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { date2br } from "@/utils/date";
import { Link } from "react-router-dom";

export const Content = () => {
	const { data, isFetching, isSuccess, isError, error } = useGetQuestionnaires();
	const { form: { register, setValue }, filters, applyFilters } = useQuestionnairesFilters();

	const navigate = useNavigate();

	const toast = useToast();
	const { confirm, alert } = useModals();

	return (
		<>
			<Flex wrap="nowrap" justifyContent="space-between" mb="24px" gap="8px">
				<FilterContent>
					<InputGroup>
						<TextInput {...register("search")} borderRadius="45px" placeholder='Pesquisa...' />
						<InputRightElement height="100%">
							<IconButton
								size='sm'
								icon={<SearchIcon h={3} w={3} />}
								aria-label="Pesquisar"
								onClick={() => applyFilters()} />
						</InputRightElement>
					</InputGroup>

					<ResetFiltersPsychologistsButton />
				</FilterContent>

				<Button variant="brand" onClick={() => navigate("/questionarios/adicionar")} leftIcon={<AddIcon />}>Cadastrar questionário</Button>
			</Flex>

			<Card>
				{(() => {
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
													<Td>{date2br(value.created_at)}</Td>
													<Td w="120px">
														<Tooltip label="Editar" hasArrow placement="top">
															<IconButton
																as={Link}
																to={`/questionarios/editar/${value.id}`}
																type="submit"
																size='sm'
																icon={<EditIcon h={3} w={3} />}
																aria-label="Editar" />
														</Tooltip>
														{" "}
														<Tooltip label="Excluir" hasArrow placement="top">
															<IconButton
																type="submit"
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
				})()}
			</Card>

			{<Pagination
				size={filters.limit}
				page={filters.page}
				setPage={(page) => setValue("page", page, true)}
				setPageSize={(size) => setValue("limit", size, true)}
				total={1} />}
		</>
	);
};

const ResetFiltersPsychologistsButton = () => {
	const { filters } = useQuestionnairesFilters();

	const { limit: appliedLimit, page: appliedPage, ..._appliedFilters } = filters;
	const { limit: defaultLimit, page: defaultPage, ..._defaultFilters } = defaultFilters;

	if (JSON.stringify(_appliedFilters) === JSON.stringify(_defaultFilters)) {
		return;
	}

	return <ResetFiltersButton />
}
