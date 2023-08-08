import { Page } from "../../Page";
import { Content } from "./Content";

export const AddPsychologist = () => {
	return (
		<Page
			title="Adicionar psicólogo"
			startPath="/psicologos"
			urlBack="/psicologos"
			breadCrumb={{
				'/psicologos/adicionar': 'Adicionar psicólogo'
			}}>
			<Content />
		</Page >
	);
};
