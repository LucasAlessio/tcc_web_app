import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { useToast } from "@chakra-ui/react";
import { Path, FormProvider as Provider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { useCreateQuestionnaire } from "../hooks/useCreateQuestionnaire";
import { QuestionnairesPage } from "../types";

export const FormProvider = () => {
	const form = useForm<QuestionnairesPage.TAddForm>({
		defaultValues: {
			name: "",
			description: "",
			recurrence: undefined,
			questions: [],
		},
	});

	const { mutate, isLoading } = useCreateQuestionnaire();
	const navigate = useNavigate();

	const { alert } = useModals();
	const toast = useToast();

	const handleSubmit = (formData: QuestionnairesPage.TAddForm) => {
		mutate(formData, {
			onSuccess(response) {
				toast({
					title: 'Instrumento cadastrado',
					description: "O instrumento foi cadastrado com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});

				navigate('/questionarios');
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						form.setError(field as Path<QuestionnairesPage.TAddForm>, {
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
	}

	return (
		<Provider {...form}>
			<Form isSubmitting={isLoading} onSubmit={handleSubmit} />
		</Provider>
	);
};
