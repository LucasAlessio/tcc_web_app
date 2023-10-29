import { useParams } from "react-router-dom";
import { Page } from "../../Page";
import { Content } from "./Content";

export const ExportQuestionnaire = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<Page
			title="Exportar questionário"
			startPath="/questionarios"
			urlBack="/questionarios"
			breadCrumb={{
				[`/questionarios/exportar/${id}`]: 'Exportar questionário'
			}}>
			<Content />
		</Page >
	);
};
