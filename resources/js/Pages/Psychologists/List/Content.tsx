import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { defaultFilters } from "../ProviderPage";
import { usePsychologistsFilters } from "../hooks/usePsychologistsFilters";
import { TableContent } from "./TableContent";

export const Content = () => {
	const { form: { register }, applyFilters } = usePsychologistsFilters();

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

				<Button variant="brand" onClick={() => navigate("/psicologos/adicionar")} leftIcon={<AddIcon />}>Cadastrar psicólogo</Button>
			</Flex>

			<TableContent />
		</>
	);
};

const ResetFiltersPsychologistsButton = () => {
	const { filters } = usePsychologistsFilters();

	const { limit: appliedLimit, page: appliedPage, ..._appliedFilters } = filters;
	const { limit: defaultLimit, page: defaultPage, ..._defaultFilters } = defaultFilters;

	if (JSON.stringify(_appliedFilters) === JSON.stringify(_defaultFilters)) {
		return;
	}

	return <ResetFiltersButton />
}
