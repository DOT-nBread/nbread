import axios from "axios";

class UserRepository {
	async getAuth() {
		const token = localStorage.getItem("token");
		if (!token) return new Promise(() => null);
		return axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, {
			withCredentials: true,
			headers: { Authorization: token },
		});
	}
}
export default new UserRepository();
