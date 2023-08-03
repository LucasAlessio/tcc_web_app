import { HeaderLinks } from '@/Parts/Navbar/NavbarLinks';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';

export const Navbar = (props: {
	secondary: boolean;
	title: string;
	onOpen: (...args: any[]) => any;
}) => {
	const { secondary, title } = props;

	// Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
	const mainText = useColorModeValue('navy.700', 'white');
	const secondaryText = useColorModeValue('gray.700', 'white');
	const navbarIcon = useColorModeValue('gray.400', 'white');

	const navbarPosition = 'fixed' as const;
	const navbarFilter = 'none';
	const navbarBackdrop = 'blur(20px)';
	const navbarShadow = 'none';
	const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
	const navbarBorder = 'transparent';
	const secondaryMargin = '0px';
	const paddingX = '15px';
	const gap = '0px';

	return (
		<Box
			position={navbarPosition}
			w="100%"
			top={{ base: '12px', md: '16px', xl: '18px' }}
			width="100%"
			ps={{ base: "20px", md: "30px", xl: "330px" }}
			pe={{ base: "20px", md: "30px" }}>
			<Box
				boxShadow={navbarShadow}
				bg={navbarBg}
				borderColor={navbarBorder}
				filter={navbarFilter}
				backdropFilter={navbarBackdrop}
				backgroundPosition='center'
				backgroundSize='cover'
				borderRadius='16px'
				borderWidth='1.5px'
				borderStyle='solid'
				transitionDelay='0s, 0s, 0s, 0s'
				transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
				transition-property='box-shadow, background-color, filter, border'
				transitionTimingFunction='linear, linear, linear, linear'
				alignItems={{ xl: 'center' }}
				display={secondary ? 'block' : 'flex'}
				minH='75px'
				justifyContent={{ xl: 'center' }}
				lineHeight='25.6px'
				mx='auto'
				mt={secondaryMargin}
				pb='8px'
				px={{ sm: paddingX, md: '10px' }}
				pt='8px'
				w="100%">
				<Flex
					w='100%'
					flexDirection={{
						sm: 'column',
						md: 'row'
					}}
					alignItems={{ xl: 'center' }}
					mb={gap}>
					<Box mb={{ sm: '8px', md: '0px' }}>
						<Breadcrumb>
							<BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
								<BreadcrumbLink href='/' color={secondaryText}>
									<Icon as={MdHome} color={navbarIcon} fontSize="20px" lineHeight="1" />
								</BreadcrumbLink>
							</BreadcrumbItem>

							{/* <BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
							<BreadcrumbLink href='#' color={secondaryText}>
								{title}
							</BreadcrumbLink>
						</BreadcrumbItem> */}
						</Breadcrumb>

						{/* Here we create navbar brand, based on route name */}
						<Link
							color={mainText}
							href='#'
							bg='inherit'
							borderRadius='inherit'
							fontWeight='bold'
							fontSize='34px'
							_hover={{ color: { mainText } }}
							_active={{
								bg: 'inherit',
								transform: 'none',
								borderColor: 'transparent'
							}}
							_focus={{
								boxShadow: 'none'
							}}>
							{title}
						</Link>
					</Box>

					<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
						<HeaderLinks secondary={props.secondary} />
					</Box>
				</Flex>
			</Box>
		</Box>
	);
}
