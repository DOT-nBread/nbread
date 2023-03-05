import axios, { AxiosRequestConfig } from "axios";

export function getJWTHeader(): Record<string, string> | undefined {
	const token = localStorage.getItem("token");
	if (!token) return;
	return { Authorization: token };
}

const config: AxiosRequestConfig = { baseURL: process.env.REACT_APP_API_URL };
export const axiosInstance = axios.create(config);
