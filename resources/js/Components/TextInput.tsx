// import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

// export default forwardRef(function TextInput(
//     { type = 'text', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
//     ref
// ) {
//     const localRef = useRef<HTMLInputElement>(null);

//     useImperativeHandle(ref, () => ({
//         focus: () => localRef.current?.focus(),
//     }));

//     useEffect(() => {
//         if (isFocused) {
//             localRef.current?.focus();
//         }
//     }, []);

//     return (
//         <input
//             {...props}
//             type={type}
//             className={
//                 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
//                 className
//             }
//             ref={localRef}
//         />
//     );
// });

// import { Box, useStyleConfig} from '@chakra-ui/react';

import { Input, InputProps, forwardRef } from '@chakra-ui/react';

export const TextInput = forwardRef<InputProps, 'input'>(({ children, ...props }, ref) => {
	return (
		<Input
			ref={ref}
			variant="main"
			fontSize='sm'
			ms={{ base: "0px", md: "0px" }}
			type='text'
			fontWeight='500'
			size='md'
			py="0"
			{...props} />
	)
});

