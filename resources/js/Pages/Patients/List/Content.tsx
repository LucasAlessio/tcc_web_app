import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { defaultFilters } from "../ProviderPage";
import { usePatientsFilters } from "../hooks/usePatientsFilters";
import { TableContent } from "./TableContent";

export const Content = () => {
	const { form: { register }, applyFilters } = usePatientsFilters();

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

					<ResetFiltersPatientsButton />
				</FilterContent>
			</Flex>

			<TableContent />
		</>
	);
};

const ResetFiltersPatientsButton = () => {
	const { filters } = usePatientsFilters();

	const { limit: appliedLimit, page: appliedPage, ..._appliedFilters } = filters;
	const { limit: defaultLimit, page: defaultPage, ..._defaultFilters } = defaultFilters;

	if (JSON.stringify(_appliedFilters) === JSON.stringify(_defaultFilters)) {
		return;
	}

	return <ResetFiltersButton />
}
