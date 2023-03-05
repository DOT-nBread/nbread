import { setAccessToken } from "../user-storage";
import { useUser } from "../hooks/useUser";
import { axiosInstance } from "./axios";

interface UseAuth {
	login: (userId: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	signout: () => void;
}

// 함수들이 서버와 통신하도록 하는 역할
export function useAuth(): UseAuth {
	const { clearUser, updateUser } = useUser();

	async function authServerCall(urlEndpoint: string, username: string, password: string): Promise<void> {
		try {
			const { data, status } = await axiosInstance({
				url: urlEndpoint,
				method: "POST",
				data: { username, password },
				headers: { "Content-Type": "application/json" },
			});
			console.log("data", data);
			console.log("status", status);

			if (data.message === "로그인 성공") {
				console.log(data.message);
				console.log("data.data.accessToken", data.data.accessToken);
				setAccessToken(data.data.accessToken);
				window.location.href = "/Main";
			}
		} catch (errorResponse) {}
	}

	async function login(username: string, password: string): Promise<void> {
		authServerCall("users/login", username, password);
	}
	async function signup(email: string, password: string): Promise<void> {
		authServerCall("/user", email, password);
	}

	function signout(): void {
		clearUser();
	}

	return {
		login,
		signup,
		signout,
	};
}
