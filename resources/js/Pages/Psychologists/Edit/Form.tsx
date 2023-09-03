import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { HSeparator } from "@/Components/Separator";
import { TextInput } from "@/Components/TextInput";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { Box, Button, FormControl, FormHelperText, Heading, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdatePsychologist } from "../hooks/useUpdatePsychologist";
import { PsychologistsPage } from "../types";


export const Form = (props: PsychologistsPage.TPsychologist) => {
	const { register, handleSubmit, formState: { errors }, setError } = useForm<PsychologistsPage.TForm>({
		defaultValues: props
	});

	const { mutate, isLoading } = useUpdatePsychologist(props.id);
	const navigate = useNavigate();

	const toast = useToast();
	const { alert } = useModals();
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(formData => {
		mutate(formData, {
			onSuccess() {
				toast({
					title: 'Registro atualizado',
					description: "As informações do psicólogo foram atualizadas com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});

				navigate('/psicologos');
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<PsychologistsPage.TForm>, {
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
		<>
			<Heading as='h3' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
				Cadastro de psicólogos
			</Heading>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
				<Text size="sm">Altere as informações do psicólogo.</Text>
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
					<FormControl mb='12px' isInvalid={!!errors.psychologist?.registration_number}>
						<Label>Número de registro</Label>
						<TextInput {...register("psychologist.registration_number")} placeholder="Número de registro" />
						<HelpBlockError name="psychologist.registration_number" errors={errors} />
					</FormControl>
				</SimpleGrid>

				<Box my="12px">
					<HSeparator />
				</Box>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
					<FormControl mb='12px' isInvalid={!!errors.password}>
						<Label>Senha</Label>
						<TextInput {...register("password")} type="password" placeholder="Senha" />
						{!errors.password && (
							<FormHelperText>
								Por razões de segurança a senha atual não será exibida. Para atualizá-la basta informar a nova senha.
							</FormHelperText>
						)}
						<HelpBlockError name="password" errors={errors} />
					</FormControl>
				</SimpleGrid>

				<Box mt="12px">
					<Button variant="brand" type="submit" isLoading={isLoading} loadingText="Salvando">Salvar</Button>
				</Box>
			</form>
		</>
	);
};
