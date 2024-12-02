import { Flex, Image, Progress, useColorModeValue } from "@chakra-ui/react";
import Logo from '@img/display/logo.png';
import NegativeLogo from '@img/display/logo_negative.png';
import { Head } from "@inertiajs/react";

export const LoaderPage = () => {
	const appLogo = useColorModeValue(Logo, NegativeLogo);
	const bgColor = useColorModeValue("secondaryGray.300", "navy.900");

	return (
		<Flex position="fixed"
			top={0}
			left={0}
			w="100%"
			h="100%"
			direction="column"
			justify="center"
			align="center"
			backgroundColor={bgColor}>
			<Head title="Carregando..." />

			<Image src={appLogo} title="Serene" height="50px" mb="40px" />
			<Progress size='xs' isIndeterminate w="100px" />
		</Flex>
	);
}
