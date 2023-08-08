import React, { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";

export const createReducerContext = <S, A>(initialSate: S, reducer: (state: S, action: A) => S = state => state, displayName?: string) => {
	const MyContext = createContext<[state: S, dispatch: Dispatch<A>]>([initialSate, () => { }])

	MyContext.displayName = displayName;

	const useMyContext = () => useContext<[state: S, dispatch: Dispatch<A>]>(MyContext);

	const MyProvider: React.FC<PropsWithChildren<{ extendState?: Partial<S> }>> = ({ extendState, children }) => {
		const [state, dispatch] = useReducer(reducer, { ...initialSate, ...extendState });

		return (
			<MyContext.Provider value={[state, dispatch]}>
				{children}
			</MyContext.Provider>
		);
	}

	return {
		MyContext,
		useMyContext,
		MyProvider
	};
}
