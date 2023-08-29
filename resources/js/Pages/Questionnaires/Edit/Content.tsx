import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetQuestionnaire } from "../hooks/useGetQuestionnaire";
import { FormProvider } from "./FormProvider";

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

					return <FormProvider {...data} />;
				})()}
			</Card>
		</SimpleGrid>
	);
};
