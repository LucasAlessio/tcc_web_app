// Chakra imports
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';
import Logo from '@img/display/logo.png';
import NegativeLogo from '@img/display/logo_negative.png';
import { HSeparator } from '../../Components/Separator';

export const SidebarBrand = () => {
	const appLogo = useColorModeValue(Logo, NegativeLogo);

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src={appLogo} title="Serene" height="65px" mb="25px" />

			<HSeparator mb='20px' />
		</Flex>
	);
}
