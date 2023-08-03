import { AuthenticatedTemplate } from "@/Layouts/AuthenticatedTemplate";
import { Login } from "@/Pages/Auth/Login";
import { Home } from "@/Pages/Home";
import { NotFound } from "@/Pages/NotFound";
import { Page } from "@/Pages/Page";
import { Profile } from "@/Pages/Profile";
import { Psychologists } from "@/Pages/Psychologists";
import { AddPsychologist } from "@/Pages/Psychologists/add";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthenticatedTemplate />}>
					<Route path="/" element={<Home />} />
					<Route path="home" element={<Page title="Home">Test</Page>} />
					<Route path="psicologos">
						<Route path="" element={<Psychologists />} />
						<Route path="adicionar" element={<AddPsychologist />} />
					</Route>
					<Route path="pacientes" element={<Page title="Pacientes">Test 2</Page>} />
					<Route path="questionarios" element={<Page title="Questionários">Test</Page>} />
					<Route path="perfil" element={<Profile />} />
					<Route path="/*" element={<Page title=""><NotFound /></Page>} />
				</Route>

				<Route path="/login" index element={<Login />} />

				<Route path="*" element={<NotFound />} />
			</Routes >
		</BrowserRouter>
	);
}
