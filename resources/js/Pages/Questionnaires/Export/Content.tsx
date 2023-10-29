import { Card } from "@/Components/Card";
import { HelpBlockError } from "@/Components/HelpBlockError";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { InputDatepicker } from "@/Components/InputDatepicker";
import { Label } from "@/Components/Label";
import { Box, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, SimpleGrid, Stack, Switch, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetQuestionnaire } from "../hooks/useGetQuestionnaire";
import { QuestionnairesPage } from "../types";

import 'react-calendar/dist/Calendar.css';
import '../../../../css/calendar.css';

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

type ExportFilters = {
	startDate: string,
	endDate: string,
	responsesQuantity: number,
	format: "rows" | "columns",
	withPatientsData: boolean
}

const FormFilters = ({ name }: QuestionnairesPage.Questionnaire) => {
	const { register, control, formState: { errors }, handleSubmit } = useForm<ExportFilters>({
		defaultValues: {
			startDate: "",
			endDate: "",
			responsesQuantity: 1,
			format: "columns",
			withPatientsData: false,
		},
	});

	const submit = handleSubmit(formData => {
		console.log(formData);
	});

	return (
		<form onSubmit={submit}>
			<Text as="h2" fontSize="18px" fontWeight="bold">Questionário: {name}</Text>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="12px" mt="24px" position="relative" zIndex="10">
				<FormControl mb='12px' isInvalid={false} position="relative" zIndex="10">
					<Label>Data de início</Label>

					<Controller
						control={control}
						name="startDate"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => (
							<InputDatepicker value={value} onChange={onChange} onBlur={onBlur} />
						)} />
					<HelpBlockError name="endDate" errors={errors} />
				</FormControl>

				<FormControl mb='12px' isInvalid={false}>
					<Label>Data de fim</Label>

					<Controller
						control={control}
						name="endDate"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => <InputDatepicker value={value} onChange={onChange} onBlur={onBlur} />}
					/>
					<HelpBlockError name="startDate" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid mt="12px" columns={{ base: 1, md: 2, xl: 2 }}>
				<FormControl mb='12px'>
					<Label>Vezes que o paciente deve ter respondido o questionário:</Label>
					<NumberInput variant="main" min={1} max={1000} maxW="200px">
						<NumberInputField {...register("responsesQuantity")} placeholder="Vezes que o paciente respondeu" />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<HelpBlockError name="quantityResponses" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid mt="12px" columns={{ base: 1, md: 2, xl: 4 }} gap="12px">
				<FormControl mb='12px' isInvalid={false}>
					<Label>Forma de exportação</Label>
					<Controller
						control={control}
						name="format"
						render={({
							field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState,
						}) => (
							<RadioGroup onChange={onChange as (event: ExportFilters["format"]) => void} value={value} size="lg">
								<Stack direction="column">
									<Radio value="columns">Um paciente por linha</Radio>
									<Radio value="rows">Mais de um paciente por linha</Radio>
								</Stack>
							</RadioGroup>
						)} />
					<HelpBlockError name="format" errors={errors} />
				</FormControl>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }} mt="12px">
				<FormControl flexDirection="row" display="flex" alignItems="center" justifyContent="flex-start" gap="12px">
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
					<FormLabel mb='0' cursor="pointer">Incluir informações do paciente</FormLabel>
				</FormControl>
			</SimpleGrid>

			<Box mt="24px">
				<Button
					variant="brand"
					type="submit"
					loadingText="Salvando"
					isLoading={false}>
					Salvar
				</Button>
			</Box>
		</form>
	);
}
