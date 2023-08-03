import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { TextInput } from "@/Components/TextInput";
import { useAuth2 } from "@/Contexts/Auth2";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { Box, Button, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";

export type TForm = {
	password: string,
}

export const DeleteAccount = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<TForm>({
		defaultValues: {
			password: "",
		}
	});

	const { deleteAccount, isLoading } = useAuth2();
	const { alert } = useModals();

	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const submit = handleSubmit(formData => {
		deleteAccount(formData, {
			onSuccess() {
				onClose();
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

	const handleCancel = () => {
		reset();
		onClose();
	};

	return (
		<>
			<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
				<Card>
					<Text as='h2' mb='12px' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
						Informações do perfil
					</Text>

					<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }}>
						<Text size="sm">Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes de excluir sua conta, faça o download de todos os dados ou informações que deseja reter.</Text>
					</SimpleGrid>

					<Box mt="12px">
						<Button colorScheme="red" onClick={onOpen}>Deletar conta</Button>
					</Box>
				</Card>
			</SimpleGrid>

			<Modal
				size='2xl'
				isCentered
				isOpen={isOpen}
				onClose={handleCancel}>
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={submit}>
						<ModalHeader mb={0}>Tem certeza de que deseja excluir sua conta?</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Digite sua senha para confirmar que deseja excluir permanentemente sua conta.</Text>

							<FormControl mt='12px' isInvalid={!!errors.password}>
								<TextInput {...register("password")} type="password" placeholder="Senha" />
								<HelpBlockError name="password" errors={errors} />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button mr={3} variant="ghost" onClick={handleCancel}>
								Cancelar
							</Button>
							<Button colorScheme="red" type="submit" isLoading={isLoading} loadingText='Aguarde'>
								Deletar
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
