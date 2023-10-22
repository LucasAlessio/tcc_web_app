import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { useAuth2 } from "@/Contexts/Auth2";
import { getDescription as getDescriptionFamilyIncome } from "@/Enums/FamilyIncomeEnum";
import { GenderEnum, getDescription as getDescriptionGender } from "@/Enums/GenderEnum";
import { getDescription as getDescriptionMaritalStatus } from "@/Enums/MaritalStatusEnum";
import { getDescription as getDescriptionSchooling } from "@/Enums/SchoolingEnum";
import { UserRoleEnum } from "@/Enums/UserRoleEnum";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Table, TableContainer, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { MdCheck, MdClose, MdFemale, MdMale } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetPatient } from "../hooks/useGetPatient";
import { PatientsPage } from "../types";

export const TabPatient = ({ id }: { id: string; }) => {
	const { data, isLoading, isSuccess, isError, error } = useGetPatient(id);

	return (
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
};
