import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { OverlayLoader } from "@/Components/OverlayLoader";
import useModals from "@/Modals";
import { date2br } from "@/utils/date";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Pagination } from "../../../Components/Pagination";
import { useDeletePsychologist } from "../hooks/useDeletePsychologist";
import { useGetPsychologists } from "../hooks/useGetPsychologists";
import { usePsychologistsFilters } from "../hooks/usePsychologistsFilters";

export const TableContent = () => {
	const { form: { setValue }, filters } = usePsychologistsFilters();
	const { data, isFetching, isSuccess, isError, error, refetch } = useGetPsychologists();
	const { mutate, isLoading } = useDeletePsychologist();

	const toast = useToast();
	const { confirm, alert } = useModals();

	const handelDelete = (id: number) => {
		return () => {
			confirm({
				title: "Excluir psicólogo",
				message: "Você tem certeza que deseja excluir este psicólogo?",
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
					title: 'Psicólogo excluído',
					description: "O psicólogo foi excluído com sucesso.",
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

					return (
						<TableContainer overflowX="auto" whiteSpace="nowrap">
							<Table>
								<Thead>
									<Tr>
										<Th>Nome</Th>
										<Th>E-mail</Th>
										<Th>Registro</Th>
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
													<Td>{value.email}</Td>
													<Td>{value.psychologist?.registration_number}</Td>
													<Td>{date2br(value.created_at)}</Td>
													<Td w="120px">
														<Tooltip label="Editar" hasArrow placement="top">
															<IconButton
																as={Link}
																to={`/psicologos/editar/${value.id}`}
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
					);
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
