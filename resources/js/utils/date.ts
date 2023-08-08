export const date2br = (value: string) => {
	const date = new Date(value);
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat('pt-BR', options);
	return formatter.format(date);

	// return Intl.DateTimeFormat('pt-BR').format(new Date(value));
}
