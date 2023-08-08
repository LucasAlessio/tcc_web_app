import { CircularProgress } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";

export const IndeterminatedCircularProgress = () => {
	const color = useColorModeValue("brand.500", "white");
	const trackColor = useColorModeValue("gray.100", "gray.500");

	return (
		<CircularProgress
			isIndeterminate
			color={color}
			size="35px"
			mx="auto"
			thickness="4px"
			trackColor={trackColor} />
	);
}
