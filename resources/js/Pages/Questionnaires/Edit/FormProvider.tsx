import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import { useToast } from "@chakra-ui/react";
import { Path, FormProvider as Provider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import { useUpdateQuestionnaire } from "../hooks/useUpdateQuestionnaire";
import { QuestionnairesPage } from "../types";

export const FormProvider = (props: QuestionnairesPage.Questionnaire) => {
	const form = useForm<QuestionnairesPage.TForm>({
		defaultValues: props,
	});

	const { mutate, isLoading } = useUpdateQuestionnaire(props.id);
	const navigate = useNavigate();

	const { alert } = useModals();
	const toast = useToast();

	const handleSubmit = (formData: QuestionnairesPage.TForm) => {
		mutate(formData, {
			onSuccess(response) {
				toast({
					title: 'Instrumento atualizado',
					description: "O instrumento foi atualizado com sucesso.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				});

				navigate('/questionarios');
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						form.setError(field as Path<QuestionnairesPage.TForm>, {
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
