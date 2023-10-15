import { Label } from "@/Components/Label";
import { TextInput } from "@/Components/TextInput";
import { useAuth2 } from "@/Contexts/Auth2";
import AuthTemplate from "@/Layouts/AuthTemplate";
import useModals from "@/Modals";
import { isValidationException } from "@/types/utils";
import {
	Alert, AlertIcon, Box, Button, Checkbox, Flex, FormControl,
	FormLabel, Heading, Icon, Image, InputGroup,
	InputRightElement, Text,
	useColorModeValue
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FormProvider, Path, useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Logo from '../../../img/display/logo.png';
import NegativeLogo from '../../../img/display/logo_negative.png';
import ClinicalCenterLogo from '../../../img/display/logo_clinical_center.png';
import NegativeClinicalCenterLogo from '../../../img/display/logo_negative_clinical_center.png';
import { HelpBlockError } from "../../Components/HelpBlockError";
import { LoaderPage } from "../Loading";

export type TForm = {
	email: string,
	password: string,
}

export const Login = () => {
	const { user, isLoading, isLoadingIdentity, login } = useAuth2();

	// Chakra color mode
	const textColor = useColorModeValue("navy.700", "white");
	const textColorBrand = useColorModeValue("brand.500", "white");
	const brandStars = useColorModeValue("brand.500", "brand.400");
	const appLogo = useColorModeValue(Logo, NegativeLogo);
	const clinicalCenterLogo = useColorModeValue(ClinicalCenterLogo, NegativeClinicalCenterLogo);

	const [show, setShow] = useState(false);

	const form = useForm<TForm>();
	const { register, formState: { errors }, handleSubmit, setError } = form;
	const navigate = useNavigate();

	const { alert } = useModals();
	const handleClick = () => setShow(!show);

	const handleLogin = handleSubmit(formData => {
		login(formData, {
			onSuccess(response) {
				navigate('/', { replace: true });
			},
			onError(e) {
				if (isValidationException(e)) {
					Object.entries(e.errors).map(([field, errors]) => {
						setError(field as Path<TForm>, {
							message: errors[0],
							type: "validate",
						});
					});

					return;
				}

				return alert({
					title: "Ocorreu um erro",
					message: e.message,
				});
			}
		});
	});

	if (isLoadingIdentity) {
		return <LoaderPage />
	}

	if (user) {
		return <Navigate to="/" />
	}

	return (
		<AuthTemplate illustrationBackground={'https://comung.org.br/wp-content/uploads/2020/11/Foto-UCS.jpg'}>
			<Head title="Login" />

			{/* <OverlayLoader show={isLoading} /> */}

			<FormProvider {...form}>
				<form onSubmit={handleLogin}>
					<Flex
						maxW={{ base: "100%", md: "max-content" }}
						w='100%'
						mx={{ base: "auto", lg: "0px" }}
						me='auto'
						h='100%'
						alignItems='start'
						justifyContent='center'
						mb={{ base: "30px", md: "60px" }}
						px={{ base: "25px", md: "0px" }}
						mt={{ base: "40px", md: "14vh" }}
						flexDirection='column'>

						<Flex mb="24px"
							w="100%"
							justifyContent="space-evenly"
							alignItems="center"
							direction={{ base: "column", sm: "row" }}>
							<Image src={appLogo} title="Universidade de Caxias do Sul" height="65px" />
							<Image src={clinicalCenterLogo} title="Centro Clínico - UCS" height="65px" />
						</Flex>

						<Box me='auto'>
							<Heading color={textColor} fontSize='36px' mb='10px'>Entrar</Heading>
							<Text
								mb='36px'
								ms='4px'
								color="gray.400"
								fontWeight='400'
								fontSize='md'>
								Informe seu e-mail e sua senha para acessar
							</Text>
						</Box>

						<Flex
							zIndex='2'
							direction='column'
							w={{ base: "100%", md: "420px" }}
							maxW='100%'
							background='transparent'
							borderRadius='15px'
							mx={{ base: "auto", lg: "unset" }}
							me='auto'
							mb={{ base: "20px", md: "auto" }}>

							<FormControl mb='24px' isInvalid={!!errors.email}>
								<Label>E-mail <Text color={brandStars}>*</Text></Label>
								<TextInput {...register("email")} variant="auth" size="lg" placeholder="email@ucs.br" />
								<HelpBlockError name="email" errors={errors} />
							</FormControl>

							<FormControl mb='24px' isInvalid={!!errors.password}>
								<Label>Senha <Text color={brandStars}>*</Text></Label>
								<InputGroup size='md'>
									<TextInput {...register("password")} type={show ? 'text' : 'password'} variant="auth" size="lg" placeholder="******" />
									<InputRightElement display='flex' alignItems='center' mt='4px'>
										<Icon
											color="gray.400"
											_hover={{ cursor: "pointer" }}
											as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
											onClick={handleClick}
										/>
									</InputRightElement>
								</InputGroup>
								<HelpBlockError name="password" errors={errors} />
							</FormControl>

							<FormControl>
								<Flex justifyContent='space-between' align='center' mb='24px'>
									<FormControl display='flex' alignItems='center'>
										<Checkbox id='remember-login' me='10px' />
										<FormLabel
											htmlFor='remember-login'
											mb='0'
											fontWeight='normal'
											color={textColor}
											fontSize='sm'
											userSelect="none">
											Mantenha-me logado
										</FormLabel>
									</FormControl>
									<NavLink to='/esqueci-minha-senha'>
										<Text
											color={textColorBrand}
											fontSize='sm'
											fontWeight='500'
											whiteSpace="nowrap">
											Esqueci minha senha
										</Text>
									</NavLink>
								</Flex>

								{errors.root?.login && (
									<Alert status='error' variant='left-accent' mb="24px">
										<AlertIcon />
										{errors.root?.login.message}
									</Alert>
								)}

								<Button
									type="submit"
									fontSize='sm'
									variant='brand'
									fontWeight='500'
									w='100%'
									h='50'
									mb='24px'
									isLoading={isLoading}>
									Entrar
								</Button>
							</FormControl>
						</Flex>
					</Flex>
				</form>
			</FormProvider>
		</AuthTemplate>
	);
}
