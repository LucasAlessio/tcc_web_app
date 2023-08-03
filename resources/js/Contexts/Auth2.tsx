import { useLogin } from "@/Pages/Auth/hooks/useLogin";
import { useLogout } from "@/Pages/Auth/hooks/useLogout";
import { useExcluirConta } from "@/Pages/Profile/hooks/useExcluirConta";
import { PageProps, User } from "@/types";
import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { MutateOptions, useQuery } from "react-query";

type ContextData = ({
	authenticated: false,
	user: null,
} | {
	authenticated: true,
	user: User,
}) & {
	isLoadingIdentity: boolean,
	isLoading: boolean,
	login: (data: { email: string, password: string, remember?: boolean }, options?: MutateOptions<PageProps, ValidationExceptionType | Error, object>) => void,
	logout: (options?: MutateOptions<void, ValidationExceptionType | Error, {}>) => void,
	deleteAccount: (data: { password: string }, options?: MutateOptions<void, ValidationExceptionType | Error, object>) => void,
	setUser: React.Dispatch<React.SetStateAction<User | null>>,
}

const Context = createContext<ContextData>({
	authenticated: false,
	user: null,
	isLoadingIdentity: false,
	isLoading: false,
	login: () => {
		throw new Error("<Auth2Provider> is missing");
	},
	logout: () => {
		throw new Error("<Auth2Provider> is missing");
	},
	deleteAccount: () => {
		throw new Error("<Auth2Provider> is missing");
	},
	setUser: () => {
		throw new Error("<Auth2Provider> is missing");
	},
});

export const Auth2Provider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setUser] = useState<User | null>(null);

	const { isFetching } = useQuery<PageProps, Error>(
		['auth.data.identity'],
		() => http.get(route('profile')), {
		staleTime: 1000,
		cacheTime: 0,
		onSuccess: (response) => setUser(response.auth.user),
	});

	const { mutate: mutateLogin, isLoading: loggingIn } = useLogin();
	const { mutate: mutateLogout, isLoading: loggingOut } = useLogout();
	const { mutate: mutateDelete, isLoading: deleting } = useExcluirConta();

	const login = (data: { email: string, password: string, remember?: boolean }, options?: MutateOptions<PageProps, ValidationExceptionType | Error, any>) => {
		return mutateLogin(data, {
			...options,
			onSuccess: (response, variables, context) => {
				setUser(response.auth.user);
				options?.onSuccess?.(response, variables, context);
			}
		});
	}

	const logout = (options?: MutateOptions<void, ValidationExceptionType | Error, {}>) => {
		return mutateLogout({}, {
			...options,
			onSuccess: (response, variables, context) => {
				setUser(null);
				options?.onSuccess?.(response, variables, context);
			},
		});
	}

	const deleteAccount = (data: { password: string }, options?: MutateOptions<void, ValidationExceptionType | Error, object>) => {
		return mutateDelete(data, {
			...options,
			onSuccess: (response, variables, context) => {
				setUser(null);
				options?.onSuccess?.(response, variables, context);
			},
		});
	}

	return (
		<Context.Provider value={{
			...(user ? {
				authenticated: true,
				user: user
			} : {
				authenticated: false,
				user: null,
			}),
			isLoadingIdentity: isFetching,
			isLoading: loggingIn || loggingOut || deleting,
			login,
			logout,
			deleteAccount,
			setUser,
		}}>
			{children}
		</Context.Provider>
	);
}

export const useAuth2 = () => useContext<ContextData>(Context);
