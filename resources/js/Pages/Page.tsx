import { Navbar } from "@/Parts/Navbar";
import { Box, Portal, useDisclosure } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type PageProps = {
	title: string,
	isSecondary?: true,
	isNavbarFixed?: boolean,
	startPath: `/${string}`,
	urlBack?: `/${string}`,
	breadCrumb?: Record<`/${string}`, string>
}

export const Page = ({ title, isSecondary, children, startPath, urlBack, breadCrumb }: PropsWithChildren<PageProps>) => {
	const { onOpen } = useDisclosure();

	return (
		<>
			<Head title={title} />

			<Portal>
				<Box>
					<Navbar
						onOpen={onOpen}
						title={title ?? ""}
						secondary={!!isSecondary}
						startPath={startPath}
						urlBack={urlBack}
						breadCrumb={breadCrumb}
					/>
				</Box>
			</Portal>

			<Box pt={{ base: '140px', md: '100px', xl: '100px' }}>
				{children}
			</Box>
		</>
	);
}
