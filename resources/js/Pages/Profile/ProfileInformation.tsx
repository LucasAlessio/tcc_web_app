import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { useAuth2 } from "@/Contexts/Auth2";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { Box, Button, FormControl, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";
import { useSalvarInformacoesPerfil } from "./hooks/useSalvarInformacoesPerfil";

type TForm = {
	name: string,
	email: string,
}

export const ProfileInformation = () => {
	const { user, setUser } = useAuth2();

	const { register, handleSubmit, formState: { errors }, setError } = useForm<TForm>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
		}
	});
	const { mutate, isLoading } = useSalvarInformacoesPerfil();
	const { alert } = useModals();

	const toast = useToast();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(formData => {
		mutate(formData, {
			onSuccess(response) {
				toast({
					title: 'Perfil atualizado',
					description: "As informações do seu perfil foram atualizadas com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});
				setUser(response);
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<TForm>, {
							message: errors[0],
							type: "validate",
						});
					});

					return;
				}

				return alert({
					title: "Ocorreu um erro",
					message: e.message,
				});
			}
		});
	});

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Card>
				<Text as='h2' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Informações do perfil
				</Text>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<Text size="sm">Atualize informações de perfil e endereço de e-mail da sua conta.</Text>
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

					<Box mt="12px">
						<Button variant="brand" type="submit" isLoading={isLoading} loadingText='Salvando'>Salvar</Button>
					</Box>
				</form>
			</Card>
		</SimpleGrid>
	);
};
