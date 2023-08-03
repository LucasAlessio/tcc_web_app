// import { Box, useStyleConfig} from '@chakra-ui/react';

import { FormLabel, FormLabelProps, forwardRef } from '@chakra-ui/react';

export const Label = forwardRef<FormLabelProps, 'label'>(({ children, ...props }, ref) => {
	return (
		<FormLabel
			ref={ref}
			display='flex'
			ms='4px'
			mb='6px'
			fontSize='sm'
			fontWeight='500'
			{...props}>
			{children}
		</FormLabel>
	)
});
