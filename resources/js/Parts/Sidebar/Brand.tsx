// Chakra imports
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { HSeparator } from '../../Components/Separator';
import Logo from '../../../img/display/logo.png';
import NegativeLogo from '../../../img/display/logo_negative.png';

// Custom components
// import { HorizonLogo } from 'components/icons/Icons';
// import { HSeparator } from 'components/separator/Separator';

export const SidebarBrand = () => {
	const appLogo = useColorModeValue(Logo, NegativeLogo);
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src={appLogo} title="Universidade de Caxias do Sul" height="95px" mb="40px" />

			<HSeparator mb='20px' />
		</Flex>
	);
}
