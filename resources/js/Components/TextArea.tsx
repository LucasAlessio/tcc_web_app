import { Textarea, TextareaProps, forwardRef } from '@chakra-ui/react';

export const TextArea = forwardRef<TextareaProps, 'textarea'>(({ children, ...props }, ref) => {
	return (
		<Textarea
			ref={ref}
			variant="main"
			fontSize='sm'
			ms={{ base: "0px", md: "0px" }}
			type='text'
			fontWeight='500'
			size='md'
			autoComplete="off"
			{...props} />
	)
});

