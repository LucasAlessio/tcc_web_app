import { Flex, Image, Progress, Spinner, useColorModeValue } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export const LoaderPage = () => {
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

			<Image src="https://www.ucs.br/site/midia/arquivos/logoUCS2_8.png" title="Universidade de Caxias do Sul" height="95px" mb="40px" />
			<Progress size='xs' isIndeterminate w="100px" />
		</Flex>
	);
}
