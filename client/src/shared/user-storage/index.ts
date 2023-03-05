export interface Id {
	id: number;
}

export interface NewUser {
	email: string;
	name?: string;
	address?: string;
	phone?: string;
	token?: string;
}

export type User = Id & NewUser;

const USER_ACCESS_TOKEN = "token";

// helper to get user from localstorage
export function getAccessToken(): any {
	const token = localStorage.getItem(USER_ACCESS_TOKEN);
	return token ? token : null;
}

export function setAccessToken(token: any): any {
	localStorage.setItem(USER_ACCESS_TOKEN, token);
}

export function clearAccessToken(): void {
	localStorage.removeItem(USER_ACCESS_TOKEN);
}
