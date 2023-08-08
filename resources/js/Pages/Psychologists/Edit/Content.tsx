import { Card } from "@/Components/Card";
import { IndeterminatedCircularProgress } from "@/Components/InderteminatedCircularProgress";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetPsychologist } from "../hooks/useGetPsychologist";
import { Form } from "./Form";

export const Content = () => {
	const { id } = useParams<{ id: string; }>();

	const { data, isLoading, isSuccess, isError, error } = useGetPsychologist(id);

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

					return <Form {...data} />;
				})()}
			</Card>
		</SimpleGrid>
	);
};
