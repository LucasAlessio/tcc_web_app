import { Auth2Provider } from "@/Contexts/Auth2";
import { ModalProvider } from "@/Modals";
import { AppRoutes } from "@/Routes";
import theme from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export const AppProvider = () => {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Auth2Provider>
					<ModalProvider>
						<AppRoutes />
					</ModalProvider>
				</Auth2Provider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
