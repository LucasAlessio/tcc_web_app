import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { useAuth2 } from "@/Contexts/Auth2";
import { getDescription as getDescriptionFamilyIncome } from "@/Enums/FamilyIncomeEnum";
import { GenderEnum, getDescription as getDescriptionGender } from "@/Enums/GenderEnum";
import { getDescription as getDescriptionMaritalStatus } from "@/Enums/MaritalStatusEnum";
import { getDescription as getDescriptionSchooling } from "@/Enums/SchoolingEnum";
import { UserRoleEnum } from "@/Enums/UserRoleEnum";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, SimpleGrid, Switch, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Tr, useStyleConfig } from "@chakra-ui/react";
import { MdCheck, MdChecklist, MdClose, MdFemale, MdMale, MdPerson, MdSnippetFolder } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetPatient } from "../hooks/useGetPatient";
import { PatientsPage } from "../types";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();
	const { data, isLoading, isSuccess, isError, error } = useGetPatient(id);
	const { bg } = useStyleConfig('Card');

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Tabs variant='enclosed'>
				<TabList px="16px" borderBottom="0">
					<Tab _selected={{ bg }}><MdPerson /> &nbsp; Informações do paciente</Tab>
					<Tab _selected={{ bg }}><MdChecklist /> &nbsp; Controle de instrumentos</Tab>
					<Tab _selected={{ bg }}><MdSnippetFolder /> &nbsp; Respostas</Tab>
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<Card>
							{(() => {
								if (isLoading) {
									return <IndeterminatedCircularProgress />;
								}

								if (isError || !isSuccess) {
									return <Text>{error?.message ?? "Nenhum registro encontrado"}</Text>;
								}

								return <Patient {...data} />;
							})()}
						</Card>
					</TabPanel>
					<TabPanel p={0}>
						<Card>
							<Text mb="12px">Selecione os intrumentos a serem disponibilizados para o paciente:</Text>

							<SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}>
								<FormControl display='flex' alignItems='center' gap="10px" my="10px">
									<Switch size="lg" isChecked />
									<FormLabel mb='0' cursor="pointer">
										DASS-21
									</FormLabel>
								</FormControl>

								<FormControl display='flex' alignItems='center' gap="10px" my="10px">
									<Switch size="lg" isChecked />
									<FormLabel mb='0' cursor="pointer">
										PHQ-9
									</FormLabel>
								</FormControl>

								<FormControl display='flex' alignItems='center' gap="10px" my="10px">
									<Switch size="lg" isChecked />
									<FormLabel mb='0' cursor="pointer">
										COBRA
									</FormLabel>
								</FormControl>
							</SimpleGrid>


							<Box mt="12px">
								<Button variant="brand" type="submit" loadingText="Salvando">Salvar</Button>
							</Box>
						</Card>
					</TabPanel>
					<TabPanel p={0}>
						<Card>
							// TODO
						</Card>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</SimpleGrid>
	);
};

const Patient = (props: PatientsPage.Patient) => {
	const { user } = useAuth2();

	return (
		<TableContainer>
			<Table size="md">
				<Tbody>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Nome</b></Td>
						<Td>{props.name}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>E-mail</b></Td>
						<Td>{props.email}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Sexo</b></Td>
						<Td>
							<Flex direction="row" align="center" gap="4px">
								{props.patient.gender == GenderEnum.MALE ? <MdMale display="inline" /> : <MdFemale display="inline" />} {getDescriptionGender(props.patient.gender)}
							</Flex>
						</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Ocupação</b></Td>
						<Td>{props.patient.occupation}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Estado civil</b></Td>
						<Td>{getDescriptionMaritalStatus(props.patient.marital_status)}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Renda familiar</b></Td>
						<Td>{getDescriptionFamilyIncome(props.patient.family_income)}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Escolaridade</b></Td>
						<Td>{getDescriptionSchooling(props.patient.schooling)}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Possui ou tem histórico de doenças crônicas na família</b></Td>
						<Td>{props.patient.family_with_chronic_illnesses ? <MdCheck style={{ "fontSize": "24px" }} /> : <MdClose style={{ "fontSize": "24px" }} />}</Td>
					</Tr>
					<Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Possui ou tem histórico de doenças psiquiátricas na família</b></Td>
						<Td>{props.patient.family_with_psychiatric_disorders ? <MdCheck style={{ "fontSize": "24px" }} /> : <MdClose fontSize="24px" />}</Td>
					</Tr>
					{user?.role == UserRoleEnum.ADMIN && <Tr>
						<Td isNumeric w={5} whiteSpace="nowrap"><b>Psicólogo</b></Td>
						<Td>
							<Link to={`/psicologos/editar/${props.patient.psychologist.id}`} target="_blank">
								{props.patient.psychologist.name} <ExternalLinkIcon />
							</Link>
						</Td>
					</Tr>}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
