import axios from "axios";

export const http = axios.create({
	baseURL: "/",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-type": "application/json",
	},
});

http.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error.response.data),
)
