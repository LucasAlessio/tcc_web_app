import { FormProvider, useForm } from "react-hook-form";
import { QuestionnairesPage } from "../types";
import { Form } from "./Form";

export const Content = () => {
	const form = useForm<QuestionnairesPage.TAddForm>({
		defaultValues: {
			name: "",
			description: "",
			recurrence: undefined,
			questions: [],
		},
	});

	return (
		<FormProvider {...form}>
			<Form />
		</FormProvider>
	);
};
