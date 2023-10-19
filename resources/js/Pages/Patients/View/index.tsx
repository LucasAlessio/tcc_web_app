import { useParams } from "react-router-dom";
import { Page } from "../../Page";
import { Content } from "./Content";

export const ViewPatient = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<Page
			title="Ver paciente"
			startPath="/pacientes"
			urlBack="/pacientes"
			breadCrumb={{
				[`/pacientes/ver/${id}`]: 'Ver paciente'
			}}>
			<Content />
		</Page >
	);
};
