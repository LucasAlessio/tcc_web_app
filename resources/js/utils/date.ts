const isValidBrDateFormat = (value: string): boolean => {
	return /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)
}

export const date2br = (value: string): string | null => {
	const date = new Date(value);

	if (!date.getTime()) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	};
	
	const formatter = new Intl.DateTimeFormat('pt-BR', options);
	return formatter.format(date);
}

export const br2date = (value: string): Date | null => {
	if (!isValidBrDateFormat(value)) {
		return null;
	}

	const [d, m, y] = value.split('/');

	const date = new Date(Number(y), Number(m) - 1, Number(d));

	if (!date.getTime()) {
		return null;
	}

	return date;
}

export const br2intl = (value: string): string | null => {
	if (!isValidBrDateFormat(value)) {
		return null;
	}

	const [d, m, y] = value.split('/');

	const date = new Date(Number(y), Number(m) - 1, Number(d));

	if (!date.getTime()) {
		return null;
	}

	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// @ts-ignore
window.br2intl = br2intl;
