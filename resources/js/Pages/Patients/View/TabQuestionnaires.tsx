import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import useModals from "@/Modals";
import { Box, Button, FormControl, FormLabel, SimpleGrid, Switch, Text, useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useGetQuestionnaires } from "../hooks/useGetQuestionnaires";
import { useSaveQuestionnaires } from "../hooks/useSaveQuestionnaires";
import { PatientsPage } from "../types";

export const TabQuestionnaires = ({ id }: { id: string; }) => {
	const { data, isLoading, isSuccess, isError, error } = useGetQuestionnaires(id);

	return (
		<Card>
			{(() => {
				if (isLoading) {
					return <IndeterminatedCircularProgress />;
				}

				if (isError || !isSuccess) {
					return <Text>{error?.message ?? "Nenhum registro encontrado"}</Text>;
				}

				return <FormControls id={id} questionnaires={data} />;
			})()}
		</Card>
	);
};

const FormControls = ({ id, questionnaires }: { id: string; questionnaires: PatientsPage.QuestionnairesControls; }) => {
	const queryClient = useQueryClient();

	const { handleSubmit, control } = useForm<PatientsPage.QuestionnairesForm>({
		defaultValues: {
			questionnaires: questionnaires.map(({ id, active }) => ({
				id,
				active,
			}))
		},
	});

	const { mutate, isLoading } = useSaveQuestionnaires(id);

	const { alert } = useModals();
	const toast = useToast();

	const onSubmit = handleSubmit(formData => {
		mutate(formData, {
			onSuccess(response) {
				queryClient.invalidateQueries({
					queryKey: ["get.questionnaires.controls", id],
				});

				toast({
					title: 'Instrumentos salvos',
					description: "Os instrumentos foram salvos para o paciente.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});
			},
			onError(e) {
				return alert({
					title: "Ocorreu um erro",
					message: e.message,
				});
			}
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<Text mb="12px">Selecione os intrumentos a serem disponibilizados para o paciente:</Text>

			<SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}>
				{questionnaires.map((value, index) => (
					<FormControl display='flex' alignItems='center' gap="10px" my="10px" key={value.id}>
						<Controller
							control={control}
							name={`questionnaires.${index}.active`}
							render={({
								field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
							}) => (
								<Switch
									onBlur={onBlur} // notify when input is touched
									onChange={onChange} // send value to hook form
									isChecked={value}
									ref={ref} />
							)} />
						<FormLabel mb='0' cursor="pointer">
							{value.name}
						</FormLabel>
					</FormControl>
				))}
			</SimpleGrid>

			<Box mt="24px">
				<Button
					variant="brand"
					type="submit"
					loadingText="Salvando"
					isLoading={isLoading}>
					Salvar
				</Button>
			</Box>
		</form>
	);
};
