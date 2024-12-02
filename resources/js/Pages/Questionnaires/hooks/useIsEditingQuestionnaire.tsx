import { useToast } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { QuestionnairesPage } from "../types";

export const useIsQuestionnaireAnswerd = (): boolean => {
	const { formState: { defaultValues } } = useFormContext<QuestionnairesPage.TForm>();

	return Number(defaultValues?.id ?? 0) > 0 && !!defaultValues?.isAnswerd;
}

export const useToastQuestionnaireBlocked = (): (description: string) => void => {
	const toast = useToast();

	return (description: string) => {
		toast({
			description,
			status: 'warning',
			duration: 6000,
			isClosable: true,
		});
	}
}
