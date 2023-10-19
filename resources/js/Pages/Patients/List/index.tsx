import { Page } from "@/Pages/Page";
import { Content } from "./Content";

export const ListPatients = () => {
	return (
		<Page title="Pacientes" startPath="/pacientes">
			<Content />
		</Page>
	);
}
