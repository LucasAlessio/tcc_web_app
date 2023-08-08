import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { FormEvent, PropsWithChildren } from "react"
import { IoFilterCircleOutline } from "react-icons/io5";
import { useFilterContext } from ".";

type FiltercontentProps = PropsWithChildren<{

}>

export const FilterContent = ({ children }: FiltercontentProps) => {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	if (isLargerThan800) {
		return (
			<Flex wrap="nowrap" justifyContent="start" align="center" gap="4px">
				<Text fontSize="20px" as="span"><IoFilterCircleOutline /></Text> Filtros:
				<FormFilter>
					<Flex wrap="nowrap" justifyContent="start" align="center" gap="8px" width="100%">
						{children}
					</Flex>
				</FormFilter>
			</Flex >
		);
	}

	return (
		<MobileFilter>
			{children}
		</MobileFilter>
	);
}

type MobileFilterProps = PropsWithChildren<{

}>

const MobileFilter = ({ children }: MobileFilterProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { applyFilters } = useFilterContext();

	const handleApplyFilters = () => {
		applyFilters();
		onClose();
	};

	return (
		<>
			<Button onClick={onOpen}>
				<Text fontSize="20px" as={"span"}><IoFilterCircleOutline /></Text>&nbsp;&nbsp;Filtros
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				size="md">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Filtros</DrawerHeader>

					<DrawerBody>
						<FormFilter onClose={onClose}>
							{children}
						</FormFilter>
					</DrawerBody>

					<DrawerFooter>
						<Button mr={3} onClick={onClose} size='sm'>Cancelar</Button>
						<Button colorScheme='brand' color="#fff" size='sm' onClick={handleApplyFilters}>Aplicar filtros</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

type FormFilterProps = PropsWithChildren<{
	onClose?: () => void
}>;

const FormFilter = ({ children, onClose }: FormFilterProps) => {
	const { applyFilters } = useFilterContext();

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyFilters();
		onClose?.();
	}

	return (
		<form onSubmit={submit}>
			{children}
		</form>
	)
}

export const ResetFiltersButton = () => {
	const { resetFilters } = useFilterContext();

	return <Button size="sm" onClick={() => resetFilters()} px="20px" flexShrink={0}>Limpar filtros</Button>
}
