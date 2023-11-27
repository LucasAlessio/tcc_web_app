import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { OverlayLoader } from "@/Components/OverlayLoader";
import { Pagination } from "@/Components/Pagination";
import useModals from "@/Modals";
import { date2br } from "@/utils/date";
import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDeleteQuestionnaire } from "../hooks/useDeleteQuestionnaire";
import { useGetQuestionnaires } from "../hooks/useGetQuestionnaires";
import { useQuestionnairesFilters } from "../hooks/useQuestionnairesFilters";

export const TableContent = () => {
	const { form: { setValue }, filters } = useQuestionnairesFilters();
	const { data, isFetching, isSuccess, isError, error, refetch } = useGetQuestionnaires();
	const { mutate, isLoading } = useDeleteQuestionnaire();

	const toast = useToast();
	const { confirm, alert } = useModals();

	const handelDelete = (id: number) => {
		return () => {
			confirm({
				title: "Excluir instrumento",
				message: "Você tem certeza que deseja excluir este instrumento?",
			}, {
				okText: "Excluir",
				okButtonProps: {
					variant: undefined,
					colorScheme: "red",
				},
				cancelText: "Cancelar",
			}).then(() => {
				deleteFn(id);
			}).catch(_ => { });
		};
	};

	const deleteFn = (id: number) => {
		mutate(id, {
			onSuccess() {
				toast({
					title: 'Instrumento excluído',
					description: "O instrumento foi excluído com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});

				refetch();
			},
			onError(e) {
				return alert({
					title: "Ocorreu um erro",
					message: e.message,
				});
			}
		});
	};

	return (
		<>
			{<OverlayLoader show={isLoading} />}

			<Card>
				{(() => {
					if (isError) {
						return error?.message;
					}

					return <TableContainer overflowX="auto" whiteSpace="nowrap">
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
															aria-label="Excluir"
															onClick={handelDelete(value.id)} />
													</Tooltip>
												</Td>
											</Tr>
										))}
									</>;
								})()}
							</Tbody>
						</Table>
					</TableContainer>
				})()}
			</Card>

			<Pagination
				size={filters.limit}
				page={filters.page}
				setPage={(page) => setValue("page", page, true)}
				setPageSize={(size) => setValue("limit", size, true)}
				total={data?.total || 1} />
		</>
	);
};
