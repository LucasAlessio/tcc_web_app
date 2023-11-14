// Chakra Imports
import { useAuth2 } from '@/Contexts/Auth2';
import useModals from '@/Modals';
import { SidebarResponsive } from '@/Parts/Sidebar';
import { Avatar, Button, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdInfoOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { NotificationsMenu } from './NotificationsMenu';

export const HeaderLinks = (props: { secondary: boolean }) => {
	const { secondary } = props;
	const { colorMode, toggleColorMode } = useColorMode();

	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	const menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');

	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const { user, logout } = useAuth2();
	const { alert } = useModals();

	const handleLogout = () => {
		logout({
			onError(error) {
				alert({
					title: "Ocorreu um erro",
					message: error.message ?? "Atualize a página e tente novamente",
				})
			}
		});
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems='center'
			flexDirection='row'
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			ps='20px'
			borderRadius='30px'
			boxShadow={shadow}
			justifyContent="space-between">

			<SidebarResponsive />

			<Flex
				alignItems='center'
				flexDirection='row'>

				{/* <SearchBar
					mb={() => {
						if (secondary) {
							return { base: '10px', md: 'unset' };
						}
						return 'unset';
					}}
					me='10px'
					borderRadius='30px'
				/> */}

				<NotificationsMenu />

				<Menu>
					<MenuButton
						bg='transparent'
						p='0px'
						minW='unset'
						minH='unset'
						h='18px'
						w='max-content'
						lineHeight="1" >
						<Icon
							as={MdInfoOutline}
							color={navbarIcon}
							me='10px'
							h='18px'
							w='18px' />
					</MenuButton>
					<MenuList
						boxShadow={shadow}
						p='20px'
						me={{ base: '30px', md: 'unset' }}
						borderRadius='20px'
						bg={menuBg}
						border='none'
						mt='22px'
						minW={{ base: 'unset' }}
						maxW={{ base: '360px', md: 'unset' }}>
						<Image src='https://auth.ucs.br/static/core/logo.jpg' borderRadius='16px' mb='28px' />
						<Flex flexDirection='column'>
						</Flex>
					</MenuList>
				</Menu>

				<Button
					variant='no-hover'
					bg='transparent'
					p='0px'
					minW='unset'
					minH='unset'
					h='18px'
					w='max-content'
					onClick={toggleColorMode}>
					<Icon
						me='10px'
						h='18px'
						w='18px'
						color={navbarIcon}
						as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
					/>
				</Button>

				<Menu>
					<MenuButton p='0px'>
						<Avatar
							_hover={{ cursor: 'pointer' }}
							color='white'
							name={`${user?.name}`}
							bg='#11047A'
							size='sm'
							w='40px'
							h='40px'
						/>
					</MenuButton>
					<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
						<Flex w='100%' mb='0px'>
							<Text
								ps='20px'
								pt='16px'
								pb='10px'
								w='100%'
								borderBottom='1px solid'
								borderColor={borderColor}
								fontSize='sm'
								fontWeight='700'
								color={textColor}>
								&#128075; &nbsp; Olá, {`${user?.name}`}
							</Text>
						</Flex>

						<Flex flexDirection='column' p='10px'>
							<MenuItem
								_hover={{ bg: 'rgba(0, 0, 0, .05)' }}
								_active={{ bg: 'rgba(0, 0, 0, .075)' }}
								bg="none"
								borderRadius='8px'
								px='14px'
								as={Link}
								to='/perfil'>
								<Text fontSize='sm'>Informações de perfil</Text>
							</MenuItem>
							<MenuItem
								_hover={{ bg: 'rgba(0, 0, 0, .05)' }}
								_active={{ bg: 'rgba(0, 0, 0, .075)' }}
								bg="none"
								color='red.400'
								borderRadius='8px'
								px='14px'
								onClick={handleLogout}>
								<Text fontSize='sm'>Sair</Text>
							</MenuItem>
						</Flex>

					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
}
