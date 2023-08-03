import { LoaderPage } from "@/Pages/Loading";
import { PageProps, User } from "@/types";
import { createReducerContext } from "@/utils/createReducerContext";
import { http } from "@/utils/http";
import { AxiosError, AxiosResponse } from "axios";
import { PropsWithChildren } from "react";
import { useQuery } from "react-query";

export type TAuthData = {
	authenticated: false,
	user: null
} | {
	authenticated: true,
	user: User
};

type Actions = {
	type: 'request-login' | 'set-user',
	user: User,
} | {
	type: 'request-logout'
}

const initialState: TAuthData = {
	authenticated: false,
	user: null,
}

const reducer = (currentState: TAuthData, action: Actions): TAuthData => {
	switch (action.type) {
		case 'request-login':
			return {
				...currentState,
				authenticated: true,
				user: action.user,
			};

		case 'request-logout':
			return {
				...currentState,
				authenticated: false,
				user: null,
			};

		case 'set-user':
			return {
				...currentState,
				user: action.user,
				authenticated: true,
			}

		default:
			return {
				...currentState
			};
	}
}

const {
	MyContext: AuthContext,
	MyProvider,
	useMyContext: useAuth
} = createReducerContext<TAuthData, Actions>(initialState, reducer);

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const { data, isFetching, isSuccess } = useQuery<AxiosResponse<PageProps>["data"], AxiosError<Error>>(
		['auth.data.identity'],
		async () => {
			const { data } = await http.get(route('profile'))
			return data;
		},
		{
			staleTime: Infinity,
			cacheTime: Infinity,
		}
	);

	if (isFetching) {
		return <LoaderPage />;
	}

	if (isSuccess) {
		return (
			<MyProvider extendState={{
				authenticated: !!data.auth.user,
				...data.auth
			}}>
				{children}
			</MyProvider>
		)
	}

	return <>Ocorreu um erro.</>;
}

export { AuthContext, AuthProvider, useAuth };

