import { HeaderLinks } from '@/Parts/Navbar/NavbarLinks';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = (props: {
	secondary: boolean;
	title: string;
	startPath: `/${string}`,
	urlBack?: `/${string}`,
	breadCrumb?: Record<`/${string}`, string>
	onOpen: (...args: any[]) => any;
}) => {
	const { secondary, title, startPath, urlBack, breadCrumb } = props;

	const navigate = useNavigate();

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
					flexDirection={{ sm: 'column', md: 'row' }}
					alignItems={{ xl: 'center' }}
					mb={gap}>
					<Box mb={{ sm: '8px', md: '0px' }}>
						<Flex direction="row" alignItems="center" gap="8px" mb="4px">
							{urlBack && <Button leftIcon={<ArrowBackIcon />} size="xs" onClick={() => navigate(urlBack)} colorScheme="brand" variant="outline">Voltar</Button>}

							<Breadcrumb alignItems="center" height="auto">
								<BreadcrumbItem color={secondaryText} fontSize='sm'>
									<BreadcrumbLink onClick={() => navigate(startPath)} color={secondaryText} verticalAlign="bottom" display="inline">
										<Icon as={MdHome} color={navbarIcon} fontSize="20px" lineHeight="1" display="block" />
									</BreadcrumbLink>
								</BreadcrumbItem>

								{Object.entries(breadCrumb ?? {}).map(([url, title], index) => (
									<BreadcrumbItem key={url} color={secondaryText} fontSize='sm' isCurrentPage={index === Object.keys(breadCrumb ?? {}).length - 1}>
										<BreadcrumbLink href={url} color={secondaryText}>
											{title}
										</BreadcrumbLink>
									</BreadcrumbItem>
								))}
							</Breadcrumb>
						</Flex>

						<Heading
							as="h2"
							color={mainText}
							fontWeight='bold'
							fontSize='34px'
							whiteSpace="nowrap"
							width="100%"
							overflow="hidden"
							textOverflow="ellipsis"
							py="4px">
							{title}
						</Heading>
					</Box>

					<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
						<HeaderLinks secondary={props.secondary} />
					</Box>
				</Flex>
			</Box >
		</Box >
	);
}
