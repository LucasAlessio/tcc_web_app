import { FiltersProvider } from "@/Components/Filter";
import { TextInput } from "@/Components/TextInput";
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, InputGroup, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { Pagination } from "../../Components/Pagination";
import { Page } from "../Page";
import { useFilters } from "./hooks/useFilters";
import { PsychologistsPage } from "./types";
import { Card } from "@/Components/Card";
import { useNavigate } from "react-router-dom";

const filtrosPadroes: PsychologistsPage.Filters = {
	search: "",
	page: 1,
	pageSize: 10,
}

export const Psychologists = () => {
	return (
		<FiltersProvider defaultValues={filtrosPadroes}>
			<Page title="Psicólogos">
				<Pagina />
			</Page >
		</FiltersProvider>
	);
};

const Pagina = () => {
	const navigate = useNavigate();
	const { form: { register, setValue }, filters, applyFilters, resetFilters } = useFilters();

	return (
		<>
			<Flex wrap="nowrap" justifyContent="space-between" my="24px" gap="8px">
				<Flex wrap="nowrap" justifyContent="start" align="center" gap="8px">
					<form onSubmit={(event) => { event.preventDefault(); applyFilters(); }}>
						<InputGroup size='md'>
							<TextInput {...register("search")} borderRadius="45px" placeholder='Pesquisa...' />
							<InputRightElement height="100%">
								<IconButton
									type="submit"
									size='sm'
									icon={<SearchIcon h={3} w={3} />}
									aria-label="Pesquisar" />
							</InputRightElement>
						</InputGroup>
					</form>

					<Button size="sm" onClick={() => resetFilters()}>Limpar filtros</Button>
				</Flex>

				<Button variant="brand" onClick={() => navigate("/psicologos/adicionar")} leftIcon={<AddIcon />}>Cadastrar psicólogo</Button>
			</Flex>

			<Card>
				<TableContainer overflowX="auto" whiteSpace="nowrap">
					<Table>
						<Thead>
							<Tr>
								<Th>Nome</Th>
								<Th>E-mail</Th>
								<Th>Criado em</Th>
								<Th w="0">Ações</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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
							<Tr>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>Lucas José Alessio</Td>
								<Td>
									<Tooltip label="Editar" hasArrow placement="top">
										<IconButton
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

						</Tbody>
					</Table>
				</TableContainer>
			</Card>

			<Pagination
				size={filters.pageSize}
				page={filters.page}
				setPage={(page) => setValue("page", page, true)}
				setPageSize={(size) => setValue("pageSize", size, true)}
				total={101}
			/>
		</>
	);
}
