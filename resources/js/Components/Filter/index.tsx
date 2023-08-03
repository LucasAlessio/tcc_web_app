import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { DeepPartial, FieldErrors, FieldValues, UseFormProps, UseFormReturn, UseFormSetValue, useForm } from "react-hook-form";

type FilterFormatDefault = FieldValues;

type TContextFilters<T extends FilterFormatDefault = FilterFormatDefault> = {
	filters: T,
	applyFilters: (onError?: (errors: FieldErrors<T>) => void) => void,
	form: Omit<UseFormReturn<T>, "setValue" | "reset"> & {
		setValue: (name: Parameters<UseFormSetValue<T>>[0], value: Parameters<UseFormSetValue<T>>[1], applyFilters?: boolean) => void;
	},
	resetFilters: () => void,
}

type FilterProviderProps<T extends FilterFormatDefault> = PropsWithChildren<{
	defaultValues: T,
	formOptions?: UseFormProps<T>,
}>

const ContextFilters = createContext<TContextFilters>({} as TContextFilters);

export function FiltersProvider<T extends FilterFormatDefault = FilterFormatDefault>({ defaultValues, formOptions, children }: FilterProviderProps<T>) {
	const [filters, setFilters] = useState<T>(defaultValues);

	formOptions?.resolver

	const form = useForm<T>({
		...formOptions,
		defaultValues: filters as DeepPartial<T>
	});

	const applyFilters = useCallback((onError = (_: FieldErrors<T>) => { }) => {
		form.handleSubmit((_filtros) => {
			const filtros = structuredClone(_filtros);
			setFilters(filtros);
		}, onError)();
	}, [form]);

	const setValue = useCallback((
		name: Parameters<UseFormSetValue<T>>[0],
		value: Parameters<UseFormSetValue<T>>[1],
		apply?: boolean
	) => {
		form.setValue(name, value);

		if (!!apply) {
			applyFilters();
		}
	}, [applyFilters, form]);

	const resetFilters = useCallback(() => {
		form.reset();
		applyFilters();
	}, [form]);

	const { reset, setValue: _, ..._form } = form;

	return (
		<ContextFilters.Provider value={{
			filters,
			applyFilters,
			resetFilters,
			form: {
				..._form,
				//@ts-ignore
				setValue
			},
		}}>
			{children}
		</ContextFilters.Provider>
	);
}

export const useFilterContext = <T extends FilterFormatDefault = FilterFormatDefault>() => {
	return useContext(ContextFilters as unknown as React.Context<TContextFilters<T>>);
}
