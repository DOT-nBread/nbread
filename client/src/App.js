import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import LandingPage from "./pages/LandingPage";
import "antd/dist/antd.css";
import Test from "./pages/Test";
import { useGetAuth } from "./shared/react-query/user-query/user.queries";

function App() {
	const { data, isLoading } = useGetAuth();
	if (!isLoading) {
		console.log("isLoadingisLoadingisLoading", data);
	}

	return (
		<BrowserRouter>
			<Route exact path="/">
				<LandingPage />
			</Route>
			<Route path="/MyPage">
				<MyPage />
			</Route>
			<Route path="/Main">
				<Main />
			</Route>
			<Route path="/Test">
				<Test />
			</Route>
		</BrowserRouter>
	);
}

export default App;
