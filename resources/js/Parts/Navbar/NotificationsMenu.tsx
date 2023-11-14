import { IndeterminatedCircularProgress } from '@/Components/InderteminatedCircularProgress';
import { useAuth2 } from '@/Contexts/Auth2';
import { useGetNewNotifications } from '@/Pages/Notifications/hooks/useGetNewNotifications';
import { useHandleViewNotification } from '@/Pages/Notifications/hooks/useHandleViewNotification';
import { convertMarkupBold2Html } from '@/utils/text';
import { Box, Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const NotificationsMenu = () => {
	return (
		<Menu>
			{({ isOpen }) => <NotitificationsMenuContent isOpen={isOpen} />}
		</Menu>
	);
};

const NotitificationsMenuContent = ({ isOpen }: { isOpen: boolean; }) => {
	const { hasNotifications } = useAuth2();
	const { data, isFetching, isSuccess, isError, error } = useGetNewNotifications(isOpen);

	const navigate = useNavigate();

	const navbarIcon = useColorModeValue('gray.400', 'white');
	const menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');

	const notifyColor = useColorModeValue('red.600', 'red.500');

	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const handleNavigate = useHandleViewNotification();

	const handleSeeAll = () => {
		navigate("/notificacoes");
	};

	return (
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

				{hasNotifications && <Box
					position="absolute"
					width="8px"
					height="8px"
					background={notifyColor}
					borderRadius="50%"
					right={0}
					top={0}
					marginEnd="10px" />}
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
					<Button
						fontSize='sm'
						fontWeight='500'
						color={textColorBrand}
						ms='auto'
						cursor='pointer'
						variant="link"
						onClick={handleSeeAll}>
						Ver todas
					</Button>
				</Flex>
				<Flex flexDirection='column'>
					{(() => {
						if (isFetching) {
							return (
								<Flex justifyContent="center" alignItems="center">
									<IndeterminatedCircularProgress />
								</Flex>
							);
						}

						if (isError || !isSuccess) {
							return (
								<Text align="center">
									{error?.message ?? "Ocorreu um erro ao obter as notificações"}
								</Text>
							);
						}

						if (!data.length) {
							return (
								<Text align="center">
									Nenhuma nova notificação
								</Text>
							);
						}

						return (
							<>
								{data.map(notication => (
									<MenuItem
										key={notication.id}
										_hover={{ bg: 'none' }}
										_focus={{ bg: 'none' }}
										px='0'
										borderRadius='8px'
										mb='10px'
										onClick={handleNavigate(notication)}>
										<ItemContent info={notication.title}>
											<Text
												as="span"
												fontSize={{ base: "sm", md: "sm" }}
												lineHeight='100%'
												color={textColor}
												dangerouslySetInnerHTML={{ __html: convertMarkupBold2Html(notication.description ?? "") }} />
										</ItemContent>
									</MenuItem>
								))}
							</>
						);
					})()}
				</Flex>
			</MenuList>
		</>
	);
};

export function ItemContent(props: PropsWithChildren<{ info: string; }>) {
	const textColor = useColorModeValue("navy.700", "white");

	return (
		<>
			<Flex
				justify='center'
				align='center'
				borderRadius='8px'
				minH={{ base: "30px", md: "40px" }}
				h={{ base: "30px", md: "40px" }}
				minW={{ base: "30px", md: "40px" }}
				w={{ base: "30px", md: "40px" }}
				me='14px'
				bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'>
				<Icon as={MdNotifications} color='white' w={5} h={8} />
			</Flex>
			<Flex flexDirection='column'>
				<Text
					as="span"
					mb='5px'
					fontWeight='bold'
					color={textColor}
					fontSize={{ base: "md", md: "md" }}
					lineHeight="1">
					{props.info}
				</Text>
				<Flex alignItems='center'>
					{props.children}
				</Flex>
			</Flex>
		</>
	);
}
