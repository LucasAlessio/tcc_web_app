import { mode } from '@chakra-ui/theme-tools';
export const textareaStyles = {
	components: {
		Textarea: {
			baseStyle: (props: any) => ({
				fontWeight: 400,
				borderRadius: '8px',
				_invalid: {
					borderColor: 'red.300',
					boxShadow: '0 0 0 1px var(--chakra-colors-red-300)',
				},
				_focus: {
					borderColor: mode('brand.500', 'brand.400')(props),
					boxShadow: mode('0 0 0 1px var(--chakra-colors-brand-500)', '0 0 0 1px var(--chakra-colors-brand-400)')(props),
				},
			}),

			variants: {
				main: (props: any) => ({
					bg: mode('transparent', 'navy.800')(props),
					border: '1px solid',
					color: mode('secondaryGray.900', 'white')(props),
					borderColor: mode('secondaryGray.100', 'whiteAlpha.100')(props),
					borderRadius: '8px',
					fontSize: 'sm',
					p: '8px 20px',
					_placeholder: { color: 'secondaryGray.400' }
				}),
				auth: () => ({
					field: {
						bg: 'white',
						border: '1px solid',
						borderColor: 'secondaryGray.100',
						borderRadius: '16px',
						_placeholder: { color: 'secondaryGray.600' }
					}
				}),
				authSecondary: () => ({
					field: {
						bg: 'white',
						border: '1px solid',

						borderColor: 'secondaryGray.100',
						borderRadius: '16px',
						_placeholder: { color: 'secondaryGray.600' }
					}
				}),
				search: () => ({
					field: {
						border: 'none',
						py: '11px',
						borderRadius: 'inherit',
						_placeholder: { color: 'secondaryGray.600' }
					}
				})
			}
		}
	}
};
