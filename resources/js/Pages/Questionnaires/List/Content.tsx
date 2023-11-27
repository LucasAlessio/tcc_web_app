import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import { useIsPsychologist } from "@/Contexts/Auth2";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { defaultFilters } from "../ProviderPage";
import { useQuestionnairesFilters } from "../hooks/useQuestionnairesFilters";
import { TableContent } from "./TableContent";

export const Content = () => {
	const isPsychologist = useIsPsychologist();
	const { form: { register }, applyFilters } = useQuestionnairesFilters();

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

			<TableContent />
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
