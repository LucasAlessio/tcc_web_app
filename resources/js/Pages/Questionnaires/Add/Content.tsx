import { Card } from "@/Components/Card";
import { SimpleGrid } from "@chakra-ui/react";
import { FormProvider } from "./FormProvider";

export const Content = () => {
	return (
		<SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
			<Card>
				<FormProvider />
			</Card>
		</SimpleGrid>
	);
};
