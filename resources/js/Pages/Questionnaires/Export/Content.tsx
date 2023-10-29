import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { InputDatepicker } from "@/Components/InputDatepicker";
import { Label } from "@/Components/Label";
import { Box, Button, Flex, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, SimpleGrid, Stack, Switch, Text, Toast, useToast } from "@chakra-ui/react";
import { Controller, Path, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetQuestionnaire } from "../hooks/useGetQuestionnaire";
import { QuestionnairesPage } from "../types";

import 'react-calendar/dist/Calendar.css';
import '../../../../css/calendar.css';
import { useExportAnswers } from "../hooks/useExportAnswers";
import { isValidationException } from "@/types/utils";
import { br2intl } from "@/utils/date";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();
	const { data, isLoading, isSuccess, isError, error } = useGetQuestionnaire(id);

	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Card>
				{(() => {
					if (isLoading) {
						return <IndeterminatedCircularProgress />;
					}

					if (isError || !isSuccess) {
						return <Text>{error?.message ?? "Nenhum registro encontrado"}</Text>;
					}

					return <FormFilters {...data} />;
				})()}
			</Card>
		</SimpleGrid>
	);
};

const FormFilters = ({ id, name }: QuestionnairesPage.Questionnaire) => {
	const { register, control, setError, handleSubmit, formState: { errors } } = useForm<QuestionnairesPage.TExportForm>({
		defaultValues: {
			id: id,
			startDate: "",
			endDate: "",
			responsesQuantity: 1,
			format: "columns",
			withPatientsData: false,
		},
	});

	const { mutate, isLoading } = useExportAnswers();
	const toast = useToast();

	const submit = handleSubmit(formData => {
		mutate({
			...formData,
			startDate: br2intl(formData.startDate) ?? "",
			endDate: br2intl(formData.endDate) ?? "",
		}, {
			onSuccess(response) {
				if (!response.length) {
					toast({
						title: 'Sem resultados',
						description: "Não foram encontrados resultados para exportar.",
						status: 'warning',
						duration: 6000,
						isClosable: true,
					});
					return;
				}

				window.open(route('export.answers.show') + `?name=${response}`, '_blank');
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<QuestionnairesPage.TExportForm>, {
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
		<form onSubmit={submit}>
			<Text as="h2" fontSize="18px" fontWeight="bold">Questionário: {name}</Text>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="12px" mt="24px" position="relative" zIndex="10">
				<FormControl mb='12px' position="relative" zIndex="10" isInvalid={!!errors.startDate}>
					<Label>Data de início</Label>

					<Controller
						control={control}
						name="startDate"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => <InputDatepicker value={value} onChange={onChange} onBlur={onBlur} />}
					/>
					<HelpBlockError name="startDate" errors={errors} />
				</FormControl>

				<FormControl mb='12px' isInvalid={!!errors.endDate}>
					<Label>Data de fim</Label>

					<Controller
						control={control}
						name="endDate"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => <InputDatepicker value={value} onChange={onChange} onBlur={onBlur} />}
					/>
					<HelpBlockError name="endDate" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid mt="12px" columns={{ base: 1, md: 2, xl: 2 }}>
				<FormControl mb='12px' isInvalid={!!errors.responsesQuantity}>
					<Label>Vezes que o paciente deve ter respondido o questionário:</Label>
					<NumberInput variant="main" min={0} max={1000} maxW="200px">
						<NumberInputField {...register("responsesQuantity")} placeholder="Vezes que o paciente respondeu" />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<HelpBlockError name="responsesQuantity" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid mt="12px" columns={{ base: 1 }} gap="12px">
				<FormControl mb='12px' isInvalid={!!errors.format}>
					<Label>Forma de exportação</Label>
					<Controller
						control={control}
						name="format"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => (
							<RadioGroup onChange={onChange as (event: QuestionnairesPage.TExportForm["format"]) => void} value={value} size="lg">
								<Stack direction="column">
									<Radio value="columns">Um paciente por linha</Radio>
									<Radio value="rows">Mais de um paciente por linha</Radio>
								</Stack>
							</RadioGroup>
						)} />
					<HelpBlockError name="format" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1 }} mt="12px">
				<FormControl isInvalid={!!errors.withPatientsData}>
					<Flex flexDirection="row" display="flex" alignItems="center" justifyContent="flex-start" gap="12px">
						<Controller
							control={control}
							name="withPatientsData"
							render={({
								field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
							}) => (
								<Switch
									onBlur={onBlur} // notify when input is touched
									onChange={onChange} // send value to hook form
									isChecked={value}
									ref={ref} />
							)} />
						<FormLabel mb='0' cursor="pointer" w="100%">Incluir informações do paciente</FormLabel>
					</Flex>
					<HelpBlockError name="withPatientsData" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<Box mt="24px">
				<Button
					variant="brand"
					type="submit"
					loadingText="Gerando arquivo"
					isLoading={isLoading}>
					Exportar
				</Button>
			</Box>
		</form>
	);
}
