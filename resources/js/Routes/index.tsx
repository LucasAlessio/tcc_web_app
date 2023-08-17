import { AuthenticatedTemplate } from "@/Layouts/AuthenticatedTemplate";
import { Login } from "@/Pages/Auth/Login";
import { Home } from "@/Pages/Home";
import { NotFound } from "@/Pages/NotFound";
import { Page } from "@/Pages/Page";
import { Profile } from "@/Pages/Profile";
import { AddPsychologist } from "@/Pages/Psychologists/Add";
import { EditPsychologist } from "@/Pages/Psychologists/Edit";
import { ListPsychologists } from "@/Pages/Psychologists/List";
import { PsychologistsProvider } from "@/Pages/Psychologists/ProviderPage";
import { AddQuestionnaire } from "@/Pages/Questionnaires/Add";
import { ListQuestionnaires } from "@/Pages/Questionnaires/List";
import { QuestionnairesProvider } from "@/Pages/Questionnaires/ProviderPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthenticatedTemplate />}>
					<Route path="/" element={<Home />} />
					<Route path="home" element={<Page title="Home" startPath="/home">Test</Page>} />
					<Route path="psicologos" element={<PsychologistsProvider />}>
						<Route path="" element={<ListPsychologists />} />
						<Route path="adicionar" element={<AddPsychologist />} />
						<Route path="editar/:id" element={<EditPsychologist />} />
					</Route>
					<Route path="pacientes" element={<Page title="Pacientes" startPath="/pacientes">Test 2</Page>} />
					<Route path="questionarios" element={<QuestionnairesProvider />}>
						<Route path="" element={<ListQuestionnaires />} />
						<Route path="adicionar" element={<AddQuestionnaire />} />
						<Route path="editar/:id" element={<Page title="Questionários" startPath="/questionarios">Test</Page>} />
					</Route>
					<Route path="perfil" element={<Profile />} />
					<Route path="/*" element={<Page title="" startPath="/home"><NotFound /></Page>} />
				</Route>

				<Route path="/login" index element={<Login />} />

				<Route path="*" element={<NotFound />} />
			</Routes >
		</BrowserRouter>
	);
}
