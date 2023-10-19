import { Card } from "@/Components/Card";
import { FilterContent, ResetFiltersButton } from "@/Components/Filter/FilterContent";
import { TextInput } from "@/Components/TextInput";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Pagination } from "../../../Components/Pagination";
import { defaultFilters } from "../ProviderPage";
import { usePatientsFilters } from "../hooks/usePatientsFilters";
import { TableContent } from "./TableContent";

export const Content = () => {
	const { form: { register, setValue }, filters, applyFilters } = usePatientsFilters();

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

			<Card>
				<TableContent />
			</Card>

			{<Pagination
				size={filters.limit}
				page={filters.page}
				setPage={(page) => setValue("page", page, true)}
				setPageSize={(size) => setValue("limit", size, true)}
				total={1} />}
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
