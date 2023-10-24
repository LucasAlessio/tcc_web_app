import { createReducerContext } from "@/Components/utils/createReducerContext";

type State = {
	viewing: true
	group: number,
} | {
	viewing: false
	group: undefined,
}

type Actions = {
	type: "view",
	group: number,
}

const reducer = (currentState: State, action: Actions): State => {
	switch (action.type) {
		case "view":
			return {
				...currentState,
				viewing: true,
				group: action.group,
			};

		default:
			return currentState;
	}
}

export const {
	MyContext: AnswersPatientContext,
	MyProvider: AnswersPatientProvider,
	useMyContext: useAnswersPatientContext
} = createReducerContext<State, Actions>({
	viewing: false,
	group: undefined,
}, reducer);
