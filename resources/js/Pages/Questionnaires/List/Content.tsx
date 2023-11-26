import { Card } from "@/Components/Card";
import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../Components/Pagination";
import { defaultFilters } from "../ProviderPage";
import { useQuestionnairesFilters } from "../hooks/useQuestionnairesFilters";
import { TableContent } from "./TableContent";
import { useAuth2, useIsPsychologist } from "@/Contexts/Auth2";
import { UserRoleEnum } from "@/Enums/UserRoleEnum";

export const Content = () => {
	const isPsychologist = useIsPsychologist();

	const { form: { register, setValue }, filters, applyFilters } = useQuestionnairesFilters();

	const navigate = useNavigate();

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

				{isPsychologist && <Button variant="brand" onClick={() => navigate("/questionarios/adicionar")} leftIcon={<AddIcon />}>Cadastrar questionário</Button>}
			</Flex >

			<Card>
				<TableContent />
			</Card>

			<Pagination
				size={filters.limit}
				page={filters.page}
				setPage={(page) => setValue("page", page, true)}
				setPageSize={(size) => setValue("limit", size, true)}
				total={1} />
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
