export type ValidationExceptionType<T extends string = string> = {
	message: string;
	errors: {
		[field in T]: string[]
	};
};

export const isValidationException = (e: any): e is ValidationExceptionType => {
	return 'errors' in e && typeof e.errors === "object" && Object.keys(e.errors).length > 0;
}
