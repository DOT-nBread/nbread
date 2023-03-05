import { useQuery, useMutation } from "@tanstack/react-query";
import UserRepository from "./user.repository";

export const useGetAuth = () => {
	return useQuery(["getAuth"], () => UserRepository.getAuth());
};
