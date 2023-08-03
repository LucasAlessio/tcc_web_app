import { OverlayLoader } from "@/Components/OverlayLoader";
import { Card } from "@/Components/Card";
import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { useAuth2 } from "@/Contexts/Auth2";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { Box, Button, FormControl, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";
import { useAlterarSenha } from "./hooks/useAlterarSenha";
import { HelpBlockError } from "@/Components/HelpBlockError";

type TForm = {
	current_password: string,
	password: string,
	password_confirmation: string,
}

export const UpdatePassword = () => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<TForm>({
		defaultValues: {
			current_password: "",
			password: "",
			password_confirmation: "",
		}
	});
	const { mutate, isLoading } = useAlterarSenha();
	const toast = useToast();
	const { alert } = useModals();

	const submit = handleSubmit(formData => {
		mutate(formData, {
			onSuccess() {
				toast({
					title: 'Senha alterada',
					description: "A sua senha atual foi alterada com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});
				reset();
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
			{/* <OverlayLoader show={isLoading} /> */}

			<Card>
				<Text as='h2' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Atualizar senha
				</Text>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<Text size="sm">Certifique-se de que sua conta esteja usando uma senha longa e aleatória para se manter segura</Text>
				</SimpleGrid>

				<form onSubmit={submit}>
					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mt="24px" mb='12px' isInvalid={!!errors.current_password}>
							<Label>Senha atual</Label>
							<TextInput {...register("current_password")} type="password" placeholder="Senha atual" />
							<HelpBlockError name="current_password" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mb='12px' isInvalid={!!errors.password}>
							<Label>Nova senha</Label>
							<TextInput  {...register("password")} type="password" placeholder="Nova senha" />
							<HelpBlockError name="password" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<FormControl mb='12px' isInvalid={!!errors.password_confirmation}>
							<Label>Confirmar nova senha</Label>
							<TextInput  {...register("password_confirmation")} type="password" placeholder="Confirmação da senha" />
							<HelpBlockError name="password_confirmation" errors={errors} />
						</FormControl>
					</SimpleGrid>

					<Box mt="12px">
						<Button type="submit" variant="brand" isLoading={isLoading} loadingText='Salvando'>Salvar</Button>
					</Box>
				</form>
			</Card>
		</SimpleGrid>
	);
};
