import { Page } from "../Page";
import { ProfileInformation } from "./ProfileInformation";
import { UpdatePassword } from "./UpdatePassword";
import { DeleteAccount } from "./DeleteAccount";

export const Profile = () => {
	return (
		<Page title="Meu perfil">
			<ProfileInformation />

			<UpdatePassword />

			<DeleteAccount />
		</Page >
	);
};
