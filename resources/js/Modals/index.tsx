import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text
} from '@chakra-ui/react';
import { ReactNode, createContext, useCallback, useContext, useRef, useState } from 'react';

enum ModalType {
	Alert,
	Confirm,
	Prompt,
}

export type Modals = {
	alert: (
		content: {
			title?: string | ReactNode,
			message: string | ReactNode,
		},
		options?: ModalOpenerProps
	) => Promise<boolean | null>
	confirm: (
		content: {
			title?: string | ReactNode,
			message: string | ReactNode,
		},
		options?: ModalOpenerProps
	) => Promise<boolean | null>
	prompt: (
		content: {
			title?: string | ReactNode,
			message: string | ReactNode,
		},
		options?: ModalOpenerProps & {
			defaultValue?: string
		}
	) => Promise<string | null>
}

export type ModalOpenerProps = {
	okText?: string
	cancelText?: string
	icon?: ReactNode
	modalProps?: Partial<React.ComponentProps<typeof Modal>>
	okButtonProps?: Partial<React.ComponentProps<typeof Button>>
	cancelButtonProps?: Partial<React.ComponentProps<typeof Button>>
}

const defaultContext: Modals = {
	alert() {
		throw new Error('<ModalProvider> is missing')
	},
	confirm() {
		throw new Error('<ModalProvider> is missing')
	},
	prompt() {
		throw new Error('<ModalProvider> is missing')
	},
}

const Context = createContext<Modals>(defaultContext)


export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modal, setModal] = useState<ReactNode | null>(null)
	const input = useRef<HTMLInputElement>(null)
	const ok = useRef<HTMLButtonElement>(null)

	const createOpener = useCallback((type: ModalType) => (
		content: {
			title?: string | ReactNode,
			message: string | ReactNode,
		},
		options: ModalOpenerProps & { defaultValue?: string } = {}
	) => (
		new Promise<boolean | string | undefined>((resolve, reject) => {
			const handleClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
				e?.preventDefault()
				setModal(null)
				reject(undefined)
			}

			const handleCancel = (e?: React.MouseEvent<HTMLButtonElement>) => {
				e?.preventDefault()
				setModal(null)
				if (type === ModalType.Prompt) {
					reject(undefined)
				} else {
					reject(false)
				}
			}

			const handleOK = (e?: React.MouseEvent<HTMLButtonElement>) => {
				e?.preventDefault()
				setModal(null)
				if (type === ModalType.Prompt) {
					resolve(input.current?.value)
				} else {
					resolve(true)
				}
			}

			setModal(
				<Modal
					size={'2xl'}
					isCentered
					isOpen={true}
					onClose={handleClose}
					initialFocusRef={type === ModalType.Prompt ? input : ok}
					{...options.modalProps}>
					<ModalOverlay />
					<ModalContent w="600px">
						<ModalHeader>{content.title ?? "Aviso"}</ModalHeader>
						<ModalBody>
							<Flex gap={4} alignItems="center">
								{options.icon}
								<Stack spacing={5}>
									<Text>{content.message}</Text>
									{type === ModalType.Prompt && (
										<Input ref={input} defaultValue={options.defaultValue} />
									)}
								</Stack>
							</Flex>
						</ModalBody>
						<ModalFooter>
							{type !== ModalType.Alert && (
								<Button
									mr={3}
									variant="ghost"
									onClick={handleCancel}
									{...options.cancelButtonProps}
								>
									{options.cancelText ?? 'Cancel'}
								</Button>
							)}
							<Button
								onClick={handleOK}
								ref={ok}
								variant="brand"
								{...options.okButtonProps}>
								{options.okText ?? 'OK'}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)
		})
	), [children]);

	return (
		<Context.Provider
			value={{
				alert: createOpener(ModalType.Alert),
				confirm: createOpener(ModalType.Confirm),
				prompt: createOpener(ModalType.Prompt),
			} as Modals}>
			{children}
			{modal}
		</Context.Provider>
	);
}

const useModals = () => useContext(Context)

export default useModals
