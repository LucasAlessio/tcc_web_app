import { br2date, date2br } from "@/utils/date";
import { CalendarIcon } from "@chakra-ui/icons";
import { Icon, IconButton, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { useMask } from "@react-input/mask";
import Calendar from "react-calendar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { TextInput } from "./TextInput";

type InputDatepickerProps = {
	value: string,
	onChange: (event: string | React.ChangeEvent<Element>) => void,
	onBlur: () => void,
}

export const InputDatepicker = ({ value, onChange, onBlur }: InputDatepickerProps) => {
	const mask = useMask({
		mask: "dd/dd/dddd",
		replacement: { "d": /\d/ },
		showMask: false,
	});

	return (
		<InputGroup>
			<TextInput ref={mask} onChange={onChange} onBlur={onBlur} value={value} placeholder="dd/mm/aaaa" />

			<InputRightElement>
				<Popover>
					{(({ isOpen, onClose }) => (
						<>
							<PopoverTrigger>
								<IconButton
									size='sm'
									icon={<CalendarIcon h={3} w={3} />}
									aria-label="Pesquisar" />
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverBody>
									{
										/**
										 * Retornamos o calendario apenas se aberto para que seja remontado
										 * e conter possíveis mudanças feitas diretamente no input de texto
										 */
									}
									{isOpen && (
										<Calendar
											onChange={(value) => {
												onChange(date2br(value?.toString() ?? ""));
												onClose();
											}}
											minDetail="year"
											calendarType="gregory"
											value={br2date(value)}
											selectRange={false}
											tileContent={<Text color='brand.500' />}
											prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
											nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
										/>
									)}
								</PopoverBody>
							</PopoverContent>
						</>
					))}
				</Popover>
			</InputRightElement>
		</InputGroup >
	);
}
