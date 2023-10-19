import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { GenderEnum, getDescription as getDescriptionGender } from "@/Enums/GenderEnum";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, SimpleGrid, Table, Tbody, Td, Text, Th, Tr } from "@chakra-ui/react";
import { MdCheck, MdClose, MdFemale, MdMale } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetPatient } from "../hooks/useGetPatient";
import { PatientsPage } from "../types";
import { getDescription as getDescriptionMaritalStatus } from "@/Enums/MaritalStatusEnum";
import { getDescription as getDescriptionFamilyIncome } from "@/Enums/FamilyIncomeEnum";
import { getDescription as getDescriptionSchooling } from "@/Enums/SchoolingEnum";
import { useAuth2 } from "@/Contexts/Auth2";
import { UserRoleEnum } from "@/Enums/UserRoleEnum";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();
	const { data, isLoading, isSuccess, isError, error } = useGetPatient(id);

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
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
		</SimpleGrid>
	);
};

const Patient = (props: PatientsPage.Patient) => {
	const { user } = useAuth2();

	return <Table layout="fixed">
		<Tbody>
			<Tr>
				<Td><b>Nome</b></Td>
				<Td>{props.name}</Td>
			</Tr>
			<Tr>
				<Td><b>E-mail</b></Td>
				<Td>{props.email}</Td>
			</Tr>
			<Tr>
				<Td><b>Sexo</b></Td>
				<Td>
					<Flex direction="row" align="center" gap="4px">
						{props.patient.gender == GenderEnum.MALE ? <MdMale display="inline" /> : <MdFemale display="inline" />} {getDescriptionGender(props.patient.gender)}
					</Flex>
				</Td>
			</Tr>
			<Tr>
				<Td><b>Ocupação</b></Td>
				<Td>{props.patient.occupation}</Td>
			</Tr>
			<Tr>
				<Td><b>Estado civil</b></Td>
				<Td>{getDescriptionMaritalStatus(props.patient.marital_status)}</Td>
			</Tr>
			<Tr>
				<Td><b>Renda familiar</b></Td>
				<Td>{getDescriptionFamilyIncome(props.patient.family_income)}</Td>
			</Tr>
			<Tr>
				<Td><b>Escolaridade</b></Td>
				<Td>{getDescriptionSchooling(props.patient.schooling)}</Td>
			</Tr>
			<Tr>
				<Td><b>Possui ou tem histórico de doenças crônicas na família</b></Td>
				<Td>{props.patient.family_with_chronic_illnesses ? <MdCheck style={{ "fontSize": "24px" }} /> : <MdClose style={{ "fontSize": "24px" }} />}</Td>
			</Tr>
			<Tr>
				<Td><b>Possui ou tem histórico de doenças psiquiátricas na família</b></Td>
				<Td>{props.patient.family_with_psychiatric_disorders ? <MdCheck style={{ "fontSize": "24px" }} /> : <MdClose fontSize="24px" />}</Td>
			</Tr>
			{user?.role == UserRoleEnum.ADMIN && <Tr>
				<Td><b>Psicólogo</b></Td>
				<Td>
					<Link to={`/psicologos/editar/${props.patient.psychologist.id}`} target="_blank">
						{props.patient.psychologist.name} <ExternalLinkIcon />
					</Link>
				</Td>
			</Tr>}
		</Tbody>
	</Table>;
}
