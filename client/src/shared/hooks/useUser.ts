import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { clearAccessToken, getAccessToken } from "../user-storage";

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

export const queryKeys = {
	user: "user",
	token: "token",
};

// query function
// 리액트 쿼리에 데이터 저장하는 역할
// 객체 반환 & 유저의 데이터 반환
// 로컬 스토리지의 데이터를 로딩해서 초기 설정 -> 새로 고침할 때 유지하는 방법
// 변경이 일어나면 updateUser로 최신 상태 유지
async function getUser(): Promise<any> {
	const token = localStorage.getItem("token");
	console.log("token", token);
	if (!token) return new Promise(() => null);
	return axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, {
		withCredentials: true,
		headers: { Authorization: token },
	});
}

interface UseUser {
	user: User | null;
	updateUser: (user: User) => void;
	clearUser: () => void;
}

// 로컬 스토리지와 쿼리 캐시에서 사용자의 상태를 유지하도록 함
export function useUser(): UseUser {
	const queryClient = useQueryClient();

	const { data: user } = useQuery([queryKeys.token], () => getUser(), {
		initialData: getAccessToken,

		onSuccess: (res) => {
			console.log("useUser resresresres", res);
			if (!res) {
				clearAccessToken();
			} else {
				// setAccessToken(res);
			}
		},
	});

	function updateUser(newToken: User): void {
		queryClient.setQueryData([queryKeys.token], newToken);
	}

	function clearUser() {
		clearAccessToken();
		queryClient.setQueryData([queryKeys.token], null);
		queryClient.removeQueries([queryKeys.token, queryKeys.user]);
	}

	return { user, updateUser, clearUser };
}
