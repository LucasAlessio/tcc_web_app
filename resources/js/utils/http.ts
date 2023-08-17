import axios, { AxiosInstance } from "axios";

declare module 'axios' {
	export interface AxiosInstance {
		request<T = any> (config: AxiosRequestConfig): Promise<T>;
		get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
		post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	}
}

export const http: AxiosInstance = axios.create({
	baseURL: "/",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-type": "application/json",
	},
});

http.interceptors.response.use(
	(response) => response.data ?? undefined,
	(error) => Promise.reject(error?.response.data ?? error),
)
