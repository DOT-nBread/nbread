import { QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
	// error is type unknown because in js, anything can be an error (e.g. throw(5))
	const id = "react-query-error";
	const title =
		error instanceof Error
			? // remove the initial 'Error: ' that accompanies many errors
			  error.toString().replace(/^Error:\s*/, "")
			: "error connecting to server";
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: queryErrorHandler,
			staleTime: 600000, // 10 minutes
			cacheTime: 900000, // 15 minutes
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	},
});
