import { HelpBlockError } from "@/Components/HelpBlockError";
import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, InputGroup, InputRightElement, Tooltip } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { QuestionnairesPage } from "../types";
import { useIsQuestionnaireAnswerd } from "../hooks/useIsEditingQuestionnaire";

type AlternativeProps = {
	questionIndex: number;
	alternativeIndex: number;
	handleRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Alternative = ({ questionIndex, alternativeIndex, handleRemove }: AlternativeProps) => {
	const { register, formState: { errors } } = useFormContext<QuestionnairesPage.TForm>();

	const isAnswerd = useIsQuestionnaireAnswerd();

	return (
		<Box width={{ base: "100%", md: "50%", lg: "25%" }} px="6px">
			<FormControl mb='12px' isInvalid={!!errors?.questions?.[questionIndex]?.alternatives?.[alternativeIndex]}>
				<Label>Alternativa {alternativeIndex + 1}</Label>
				<InputGroup>
					<TextInput {...register(`questions.${questionIndex}.alternatives.${alternativeIndex}.description`)} placeholder="Descrição" />
					{!isAnswerd && <InputRightElement>
						<Tooltip label="Remover alternativa" hasArrow placement="top">
							<IconButton
								variant="outline"
								size="sm"
								onClick={handleRemove}
								icon={<DeleteIcon h={3} w={3} />}
								aria-label="Remover pergunta" />
						</Tooltip>
					</InputRightElement>}
				</InputGroup>
				<HelpBlockError name={`questions.${questionIndex}.alternatives.${alternativeIndex}.description`} errors={errors} />
			</FormControl>
		</Box>
	);
};
