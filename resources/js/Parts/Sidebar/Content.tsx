import { SidebarBrand } from '@/Parts/Sidebar/Brand';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { SidebarLinks } from './Links';

export const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>

			<SidebarBrand />

			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<SidebarLinks onClose={onClose} />
				</Box>
			</Stack>
		</Flex>
	);
}
