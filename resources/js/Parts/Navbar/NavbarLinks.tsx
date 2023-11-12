// Chakra Imports
import { useAuth2 } from '@/Contexts/Auth2';
import useModals from '@/Modals';
import { SidebarResponsive } from '@/Parts/Sidebar';
import { Avatar, Box, Button, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdInfoOutline, MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const HeaderLinks = (props: { secondary: boolean }) => {
	const { secondary } = props;
	const { colorMode, toggleColorMode } = useColorMode();

	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');

	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const notifyColor = useColorModeValue('red.600', 'red.500');

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

				<Menu>
					{({ isOpen }) => (
						<>
							<MenuButton
								bg='transparent'
								p='0px'
								minW='unset'
								minH='unset'
								h='18px'
								w='max-content'
								lineHeight="1"
								position="relative">

								<Icon
									as={MdNotificationsNone}
									color={navbarIcon}
									me='10px'
									h='18px'
									w='18px' />

								<Box
									position="absolute"
									width="8px"
									height="8px"
									background={notifyColor}
									borderRadius="50%"
									right={0}
									top={0}
									marginEnd="10px" />
							</MenuButton>

							<MenuList
								boxShadow={shadow}
								p='20px'
								borderRadius='20px'
								bg={menuBg}
								border='none'
								mt='22px'
								me={{ base: '30px', md: 'unset' }}
								minW={{ base: 'unset', md: '400px', xl: '450px' }}
								maxW={{ base: '360px', md: 'unset' }}>
								<Flex w='100%' mb='20px'>
									<Text fontSize='md' fontWeight='600' color={textColor}>
										Notificações
									</Text>
									<Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
										Ver todas
									</Text>
								</Flex>
								<Flex flexDirection='column'>
									<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
										<ItemContent info='Lucas'>
											<Text
												fontSize={{ base: "sm", md: "sm" }}
												lineHeight='100%'
												color={textColor}>
												Novo envio de respostas para <b>COBRA</b>
											</Text>
										</ItemContent>
									</MenuItem>
									<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
										<ItemContent info='Enrico Assis'>
											<Text
												fontSize={{ base: "sm", md: "sm" }}
												lineHeight='100%'
												color={textColor}>
												Novo envio de respostas para <b>PHQ-9</b>
											</Text>
										</ItemContent>
									</MenuItem>
								</Flex>
							</MenuList>
						</>
					)}
				</Menu>

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

export function ItemContent(props: PropsWithChildren<{ info: string }>) {
	const textColor = useColorModeValue("navy.700", "white");
	return (
		<>
			<Flex
				justify='center'
				align='center'
				borderRadius='16px'
				minH={{ base: "60px", md: "70px" }}
				h={{ base: "60px", md: "70px" }}
				minW={{ base: "60px", md: "70px" }}
				w={{ base: "60px", md: "70px" }}
				me='14px'
				bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'>
				<Icon as={MdNotifications} color='white' w={8} h={14} />
			</Flex>
			<Flex flexDirection='column'>
				<Text
					mb='5px'
					fontWeight='bold'
					color={textColor}
					fontSize={{ base: "md", md: "md" }}>
					{props.info}
				</Text>
				<Flex alignItems='center'>
					{props.children}
				</Flex>
			</Flex>
		</>
	);
}
