import { Navbar } from "@/Parts/Navbar";
import { Box, Portal, useDisclosure } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type PageProps = {
	title?: string,
	isSecondary?: true,
	isNavbarFixed?: boolean,
}

export const Page = ({ title, isSecondary, children }: PropsWithChildren<PageProps>) => {
	const { onOpen } = useDisclosure();

	return (
		<>
			<Head title={title} />

			<Portal>
				<Box>
					<Navbar onOpen={onOpen} title={title ?? ""} secondary={!!isSecondary} />
				</Box>
			</Portal>

			<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
				{children}
			</Box>
		</>
	);
}
