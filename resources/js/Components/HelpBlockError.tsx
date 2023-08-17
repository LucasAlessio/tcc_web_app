import { FormErrorMessage } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

export const HelpBlockError = ({ errors, name }: { errors: FieldErrors; name: string }) => {
	return (
		<>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>} />
		</>
	);
};
