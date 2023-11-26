import { UserRoleEnum } from "@/Enums/UserRoleEnum";
import { useLogin } from "@/Pages/Auth/hooks/useLogin";
import { useLogout } from "@/Pages/Auth/hooks/useLogout";
import { useExcluirConta } from "@/Pages/Profile/hooks/useExcluirConta";
import { PageProps, User } from "@/types";
import { ValidationExceptionType } from "@/types/utils";
import { http } from "@/utils/http";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { MutateOptions, useQuery, useQueryClient } from "react-query";

type ContextData = ({
	authenticated: false,
	user: null,
} | {
	authenticated: true,
	user: User,
}) & {
	isLoadingIdentity: boolean,
	isLoading: boolean,
	hasNotifications: boolean,
	login: (data: { email: string, password: string, remember?: boolean }, options?: MutateOptions<PageProps, ValidationExceptionType | Error, object>) => void,
	logout: (options?: MutateOptions<void, ValidationExceptionType | Error, {}>) => void,
	deleteAccount: (data: { password: string }, options?: MutateOptions<void, ValidationExceptionType | Error, object>) => void,
	setUser: React.Dispatch<React.SetStateAction<User | null>>,
	clearNotifications: () => void,
}

const Context = createContext<ContextData>({
	authenticated: false,
	user: null,
	isLoadingIdentity: false,
	isLoading: false,
	hasNotifications: false,
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
	clearNotifications: () => {
		throw new Error("<Auth2Provider> is missing");
	},
});

export const Auth2Provider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setUser] = useState<User | null>(null);
	const [hasNotifications, setHasNotifications] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const { isFetching } = useQuery<PageProps, Error>(
		['auth.data.identity'],
		() => http.get(route('profile')), {
		staleTime: 1000,
		cacheTime: 0,
		onSuccess: ({ auth: { user, hasNotifications } }) => {
			setUser(user);
			setHasNotifications(hasNotifications);
		},
	});

	const { mutate: mutateLogin, isLoading: loggingIn } = useLogin();
	const { mutate: mutateLogout, isLoading: loggingOut } = useLogout();
	const { mutate: mutateDelete, isLoading: deleting } = useExcluirConta();

	const login = (data: { email: string, password: string, remember?: boolean }, options?: MutateOptions<PageProps, ValidationExceptionType | Error, any>) => {
		return mutateLogin(data, {
			...options,
			onSuccess: (response, variables, context) => {
				queryClient.invalidateQueries(["get.new.notifications"]);

				setUser(response.auth.user);
				setHasNotifications(response.auth.hasNotifications);
				options?.onSuccess?.(response, variables, context);
			}
		});
	}

	const logout = (options?: MutateOptions<void, ValidationExceptionType | Error, {}>) => {
		return mutateLogout({}, {
			...options,
			onSuccess: (response, variables, context) => {
				setUser(null);
				setHasNotifications(false);
				options?.onSuccess?.(response, variables, context);
			},
		});
	}

	const deleteAccount = (data: { password: string }, options?: MutateOptions<void, ValidationExceptionType | Error, object>) => {
		return mutateDelete(data, {
			...options,
			onSuccess: (response, variables, context) => {
				setUser(null);
				setHasNotifications(false);
				options?.onSuccess?.(response, variables, context);
			},
		});
	}

	const clearNotifications = () => {
		setHasNotifications(false);
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
			hasNotifications,
			login,
			logout,
			deleteAccount,
			setUser,
			clearNotifications,
		}}>
			{children}
		</Context.Provider>
	);
}

export const useAuth2 = () => useContext<ContextData>(Context);

export const useIsPsychologist = () => {
	const { authenticated, user } = useAuth2();

	return authenticated && user.role == UserRoleEnum.PSYCHOLOGIST;
}

export const useIsAdmin = () => {
	const { authenticated, user } = useAuth2();

	return authenticated && user.role == UserRoleEnum.ADMIN;
}
