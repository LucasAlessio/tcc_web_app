import { useIsAdmin } from '@/Contexts/Auth2';
import { As, Box, Flex, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdHome, MdOutlinePeopleOutline, MdOutlinePsychology, MdOutlineQuestionAnswer } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

export const SidebarLinks = ({ onClose }: { onClose?: () => void }) => {
	const isAdmin = useIsAdmin();

	return (
		<>
			<SidebarLink name="Início" path='/' icon={MdHome} onClick={onClose} />
			{isAdmin && <SidebarLink name="Psicólogos" path='/psicologos' icon={MdOutlinePsychology} onClick={onClose} />}
			<SidebarLink name="Pacientes" path='/pacientes' icon={MdOutlinePeopleOutline} onClick={onClose} />
			<SidebarLink name="Questionários" path='/questionarios' icon={MdOutlineQuestionAnswer} onClick={onClose} />
		</>
	);
}

type SidebarLinkProps = {
	name: string,
	path: string,
	icon: As,
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const SidebarLink = ({ name, path, icon, onClick }: SidebarLinkProps) => {
	const { pathname } = useLocation();
	const isActive = pathname === "/" && path === pathname || path !== '/' && pathname.replace(/\//, '').indexOf(path.replace(/\//, '')) === 0;


	let activeColor = useColorModeValue('gray.700', 'white');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');

	return (
		<Link to={path} onClick={onClick}>
			<Box>
				<HStack
					spacing={isActive ? '22px' : '26px'}
					py='5px'
					ps='10px'>
					<Flex w='100%' alignItems='center' justifyContent='center'>
						<Box
							color={isActive ? activeIcon : textColor}
							me='18px'>
							<Icon as={icon} width='20px' height='20px' color='inherit' />
						</Box>
						<Text
							me='auto'
							color={isActive ? activeColor : textColor}
							fontWeight={isActive ? 'bold' : 'normal'}>
							{name}
						</Text>
					</Flex>
					<Box
						h='36px'
						w='4px'
						bg={isActive ? brandColor : 'transparent'}
						borderRadius='5px'
						mr="-16px"
					/>
				</HStack>
			</Box>
		</Link>
	);
}
