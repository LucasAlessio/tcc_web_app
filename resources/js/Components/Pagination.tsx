import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Tooltip } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type PaginationProps = {
	page: number,
	total: number,
	size: number,
	setPage: (page: number) => void,
	setPageSize: (size: number) => void,
}

export const Pagination = ({ page, total, size, setPage, setPageSize }: PaginationProps) => {
	const lastPage = Math.ceil(total / size);

	const disabledPrevs = page <= 1;
	const disabledNexts = page >= lastPage;

	const handleChanePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
		const newSize = Number(event.target.value);
		setPageSize(newSize);

		if (page * newSize > total) {
			const newLastPage = Math.ceil(total / newSize);
			setPage(newLastPage);
		}
	};

	return (
		<Flex justifyContent="start" my={4} alignItems="center">
			<Flex>
				<Tooltip label="Primeira página" hasArrow placement="top">
					<IconButton
						onClick={() => setPage(1)}
						isDisabled={disabledPrevs}
						icon={<ArrowLeftIcon h={3} w={3} />}
						aria-label="Primeira página"
						size="sm"
						mr={2} />
				</Tooltip>
				<Tooltip label="Página anterior" hasArrow placement="top">
					<IconButton
						onClick={() => setPage(page - 1)}
						isDisabled={disabledPrevs}
						icon={<ChevronLeftIcon h={6} w={6} />}
						aria-label="Página anterior"
						size="sm"
						mr={2} />
				</Tooltip>
			</Flex>

			<Flex alignItems="center">
				<Text flexShrink="0" mr={4}>
					Página
					{" "}
					<Text fontWeight="bold" as="span">{page}</Text>
					{" "}
					de
					{" "}
					<Text fontWeight="bold" as="span">{Math.ceil(total / size)}</Text>
				</Text>
				<Text flexShrink="0">Ir para página:</Text>{" "}
				<NumberInput
					variant="main"
					ml={2}
					mr={4}
					w={20}
					min={1}
					max={lastPage}
					defaultValue={page}
					size="sm"
					onChange={(value) => {
						const page = Number(value);

						if (page < 1) {
							setPage(1);
							return;
						}

						if (page > lastPage) {
							setPage(lastPage);
							return;
						}

						setPage(page);
					}}>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<Select
					variant="main"
					w={28}
					value={size}
					size="sm"
					onChange={handleChanePageSize}>
					{[10, 25, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Exibir {pageSize}
						</option>
					))}
				</Select>
			</Flex>

			<Flex>
				<Tooltip label="Próxima página" hasArrow placement="top">
					<IconButton
						onClick={() => setPage(page + 1)}
						isDisabled={disabledNexts}
						icon={<ChevronRightIcon h={6} w={6} />}
						aria-label="Próxima página"
						size="sm"
						ml={4} />
				</Tooltip>
				<Tooltip label="Última página" hasArrow placement="top">
					<IconButton
						onClick={() => setPage(lastPage)}
						isDisabled={disabledNexts}
						icon={<ArrowRightIcon h={3} w={3} />}
						aria-label="Última página"
						size="sm"
						ml={4} />
				</Tooltip>
			</Flex>
		</Flex>
	);
};
