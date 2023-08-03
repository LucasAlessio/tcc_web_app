import { Box, CircularProgress, Flex, useColorModeValue } from "@chakra-ui/react";
import { Transition } from "@headlessui/react";
import { Fragment } from 'react';

export const OverlayLoader = ({ show }: { show: boolean }) => {
	const color = useColorModeValue("brand.500", "white");
	const trackColor = useColorModeValue("#edebe9", "brand.400");

	return (
		<Box position="fixed" zIndex={9999}>
			<Transition
				as={Fragment}
				show={show}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div>
					<Flex position="fixed"
						top={0}
						left={0}
						w="100%"
						h="100%"
						justify="center"
						align="center"
						backgroundColor="rgba(0, 0, 0, .5)">
						{/* <Spinner color={color} /> */}
						<CircularProgress isIndeterminate color={color} thickness="4px" trackColor={trackColor} />
					</Flex>
				</div>
			</Transition>
		</Box>
	);
}
