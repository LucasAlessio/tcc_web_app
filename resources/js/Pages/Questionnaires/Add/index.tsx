import { Page } from "../../Page";
import { Content } from "./Content";

export const AddQuestionnaire = () => {
	return (
		<Page
			title="Adicionar questionário"
			startPath="/questionarios"
			urlBack="/questionarios"
			breadCrumb={{
				'/questionarios/adicionar': 'Adicionar questionário'
			}}>
			<Content />
		</Page >
	);
};
