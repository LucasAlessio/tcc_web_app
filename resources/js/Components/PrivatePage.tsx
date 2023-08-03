import { useAuth2 } from "@/Contexts/Auth2";
import { LoaderPage } from "@/Pages/Loading";
import React from "react";
import { Navigate } from "react-router-dom";

export const PrivatePage = (Component: React.FC) => {
	return function Wrapper(props: any) {
		const { isLoadingIdentity, authenticated } = useAuth2();

		if (isLoadingIdentity) {
			return <LoaderPage />
		}


		if (!authenticated) {
			return <Navigate to='/login' replace />
		}

		return (
			<>
				{/* <OverlayLoader show={isLoading} /> */}
				<Component {...props} />
			</>
		);
	};
};
