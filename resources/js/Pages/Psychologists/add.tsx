import { Card } from "@/Components/Card";
import { Box, Button, FormControl, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Page } from "../Page";
import { PsychologistsPage } from "./types";
import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { HelpBlockError } from "@/Components/HelpBlockError";

type TForm = {

}

export const AddPsychologist = () => {
	return (
		<Page title="Adicionar psicólogo">
			<Pagina />
		</Page >
	);
};

const Pagina = () => {
	const { register, handleSubmit, formState: { errors }, setError } = useForm<PsychologistsPage.TAddForm>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		}
	});

	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(formData => formData);

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Card>
				<Text as='h2' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Informações do psicólogo
				</Text>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<Text size="sm">Insira as informações do psicólogo.</Text>
				</SimpleGrid>

				<form onSubmit={submit}>
					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mt="24px" mb='12px' isInvalid={!!errors.name}>
							<Label>Nome</Label>
							<TextInput {...register("name")} placeholder="Nome" />
							<HelpBlockError name="name" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mb='12px' isInvalid={!!errors.email}>
							<Label>E-mail</Label>
							<TextInput {...register("email")} placeholder="E-mail" />
							<HelpBlockError name="email" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mb='12px' isInvalid={!!errors.password}>
							<Label>Senha</Label>
							<TextInput {...register("email")} type="password" placeholder="Senha" />
							<HelpBlockError name="email" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<Box mt="12px">
						<Button variant="brand" type="submit" isLoading={false} loadingText='Salvando'>Salvar</Button>
					</Box>
				</form>
			</Card>
		</SimpleGrid>
	);
}
