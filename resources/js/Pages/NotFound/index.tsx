import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Flex
			py={10}
			px={6}
			justifyContent="center"
			align="center"
			height="100vh"
			flexDirection="column">
			<Head title="Página não encontrada" />
			<Heading
				display="inline-block"
				as="h2"
				size="2xl"
				bgGradient="linear(to-r, brand.400, brand.600)"
				backgroundClip="text">
				404
			</Heading>
			<Text fontSize="18px" mt={3} mb={2}>
				Página não encontrada
			</Text>
			<Text color={'gray.500'} mb={6} textAlign="center">
				A página que você está procurando não parece existir
			</Text>

			<Button
				colorScheme="brand"
				bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
				color="white"
				variant="solid"
				onClick={() => navigate('/')}>
				Voltar para o início
			</Button>
		</Flex>
	);
}
