import { renderThumb, renderTrack, renderView } from '@/Components/Scrollbar';
import { SidebarContent } from '@/Parts/Sidebar/Content';
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoMenuOutline } from 'react-icons/io5';

export const Sidebar = () => {
	let variantChange = '0.2s linear';
	let shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');

	// Chakra Color Mode
	let sidebarBg = useColorModeValue('white', 'navy.800');
	let sidebarMargins = '0px';

	// SIDEBAR
	return (
		<Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%' zIndex={10}>
			<Box
				bg={sidebarBg}
				transition={variantChange}
				w='300px'
				h='100vh'
				m={sidebarMargins}
				minH='100%'
				overflowX='hidden'
				boxShadow={shadow}>
				<Scrollbars
					autoHide
					renderTrackVertical={renderTrack}
					renderThumbVertical={renderThumb}
					renderView={renderView}>
					<SidebarContent />
				</Scrollbars>
			</Box>
		</Box>
	);
}

export const SidebarResponsive = () => {
	const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
	const menuColor = useColorModeValue('gray.400', 'white');

	// SIDEBAR
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef(null);

	return (
		<Flex display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
			<Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
				<Icon
					as={IoMenuOutline}
					color={menuColor}
					my='auto'
					w='20px'
					h='20px'
					me='10px'
					_hover={{ cursor: 'pointer' }}
				/>
			</Flex>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				placement="left"
				finalFocusRef={btnRef}>

				<DrawerOverlay />

				<DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
					<DrawerCloseButton
						zIndex='3'
						onClick={onClose}
						_focus={{ boxShadow: 'none' }}
						_hover={{ boxShadow: 'none' }}
					/>
					<DrawerBody maxW='285px' px='0rem' pb='0'>
						<Scrollbars
							autoHide
							renderTrackVertical={renderTrack}
							renderThumbVertical={renderThumb}
							renderView={renderView}>

							<SidebarContent onClose={onClose} />

						</Scrollbars>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}
// PROPS
