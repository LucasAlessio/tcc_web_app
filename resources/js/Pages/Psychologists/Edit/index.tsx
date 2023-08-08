import { Page } from "../../Page";
import { Content } from "./Content";

export const EditPsychologist = () => {
	return (
		<Page
			title="Editar psicólogo"
			startPath="/psicologos"
			urlBack="/psicologos"
			breadCrumb={{
				'/psicologos/editar': 'Editar psicólogo'
			}}>
			<Content />
		</Page >
	);
};
