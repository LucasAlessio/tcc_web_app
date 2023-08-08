import { Card } from "@/Components/Card";
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Page } from "../Page";
import { ExternalLinkIcon } from '@chakra-ui/icons'

export const Home = () => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Page title="Início" startPath="/">
			<SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
				<Card>
					<Text as='h2' me='auto' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%' mb="12px">
						Bem-vindo(a)!
					</Text>

					<Text size="sm">
						Este é o sistema de gerenciamento do aplicativo Lorem ipsum.
						Utilize o menu lateral esquerdo para navegar entre pacientes, questionários e respostas.
						Você pode alterar as informações de cadastro dentro da <Link to="/perfil" className="font-bold hover:underline">
							página de perfil <ExternalLinkIcon />
						</Link>.
					</Text>

					{/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mt="24px" mb='12px' isInvalid={false}>
							<Label>Nome</Label>
							<TextInput placeholder="Nome" />
						</FormControl>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mb='12px' isInvalid={false}>
							<Label>E-mail</Label>
							<TextInput placeholder="E-mail" />
						</FormControl>
					</SimpleGrid>

					<Box mt="12px">
						<Button variant="brand">Salvar</Button>
					</Box> */}
				</Card>
			</SimpleGrid>
		</Page >
	);
};
