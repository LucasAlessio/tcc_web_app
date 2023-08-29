import { useParams } from "react-router-dom";
import { Page } from "../../Page";
import { Content } from "./Content";

export const EditQuestionnaire = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<Page
			title="Editar questionário"
			startPath="/questionarios"
			urlBack="/questionarios"
			breadCrumb={{
				[`/questionarios/editar/${id}`]: 'Editar questionário'
			}}>
			<Content />
		</Page >
	);
};
