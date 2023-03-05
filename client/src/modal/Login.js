import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { axiosLogin } from "../redux/user/action";
import SignUp from "./SignUp";
import PWConfirm from "./PWConfirm";
import { useHistory } from "react-router";
import instance, { apiClient } from "../shared/api/axios";
import { useAuth } from "../shared/api/useAuth";
import { useUser } from "../shared/hooks/useUser";

function Login({ setLoginModal, handleSignupModal, handleCloseSignupModal, handlePWConfirmModal }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const isLogin = useSelector((state) => state.loginReducer.isLogIn);

	const auth = useAuth();
	const { user } = useUser();

	const [loginInfo, setLoginInfo] = useState({
		username: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [duplicateCheck, setDuplicateCheck] = useState("");

	const handleCloseLoginModal = () => {
		setLoginModal(false);
	};

	const handleInputValue = (key) => (e) => {
		setLoginInfo({ ...loginInfo, [key]: e.target.value });
	};

	const handleLogin = () => {
		const { username, password } = loginInfo;

		if (username === "" || password === "") {
			setErrorMessage("아이디와 비밀번호를 입력하세요");
			setDuplicateCheck("");
			return;
		}
		auth.login(username, password);

		// apiClient
		// 	.post("users/login", { username: loginInfo.username, password: loginInfo.password })
		// 	.then((res) => console.log("로그인ㄴㄴㄴㄴ", res))
		// 	.catch((err) => console.log("errrr", err));

		// axios
		// 	.post(
		// 		`${process.env.REACT_APP_API_URL}/users/login`,
		// 		{
		// 			username: loginInfo.username,
		// 			password: loginInfo.password,
		// 		},
		// 		{ withCredentials: true },
		// 	)
		// 	.then((res) => {
		// 		console.log(res);
		// 		if (res.data.message === "아이디 또는 비밀번호가 일치하지 않습니다") {
		// 			setDuplicateCheck("아이디 또는 비밀번호가 일치하지 않습니다");
		// 		} else {
		// 			const { accessToken: token } = res.data.data;
		// 			console.log("sdfsdfsdf", token);
		// 			localStorage.setItem("token", token ?? "");
		// 			// dispatch(axiosLogin(loginInfo));
		// 			setLoginModal(false);
		// 			history.push("/Main");
		// 		}
		// });
	};

	return (
		<>
			<ModalBackdrop onClick={handleCloseLoginModal}>
				<Wrapper onClick={(e) => e.stopPropagation()}>
					<LoginForm onSubmit={(e) => e.preventDefault()}>
						<LoginTitle>
							로그인
							<PostSpan onClick={handleCloseLoginModal}>&times;</PostSpan>
						</LoginTitle>

						<InputField type="text" placeholder="아이디" onChange={handleInputValue("username")} />
						<Err></Err>
						<InputFieldDiv>
							<InputField type="password" placeholder="비밀번호" onChange={handleInputValue("password")} />
						</InputFieldDiv>
						<Err>{errorMessage}</Err>
						<Err>{duplicateCheck}</Err>
						<LoginButton onClick={handleLogin} type="submit">
							로그인
						</LoginButton>
						{/* <LoginButton type='submit'>카카오 로그인</LoginButton> */}
						<SignUpButton
							onClick={handleSignupModal}
							handleCloseSignupModal={handleCloseSignupModal}
							setLoginModal={setLoginModal}
						>
							회원가입
						</SignUpButton>
						{/* <PassWorldCheck onClick={handlePWConfirmModal} handleCloseSignupModal={handleCloseSignupModal} setLoginModal={setLoginModal}>비밀번호찾기</PassWorldCheck> */}
					</LoginForm>
				</Wrapper>
			</ModalBackdrop>
		</>
	);
}
//모달창이 떳을때 뒷배경 어둡게
const ModalBackdrop = styled.div`
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4);
	display: grid;
	place-items: center;
`;

const Wrapper = styled.div`
	text-align: center;
	/* width: 320px;
height: 568px; */
	width: 375px;
	height: 667px;
	display: flex;
	justify-content: center;
	background-color: #fafafa;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 30px;
`;
const LoginTitle = styled.div`
	font-family: var(--main-font);
	font-size: 28px;
	margin-top: 25px;
	margin-bottom: 35px;
`;

const PostSpan = styled.span`
	position: absolute;
	right: 40px;
	&:hover {
		cursor: pointer;
	}
`;

const LoginForm = styled.form``;

const InputFieldDiv = styled.div`
	margin-top: 14px;
`;

const InputField = styled.input`
	display: flex;
	flex-direction: column;
	width: 295px;
	height: 56px;
	font-size: 16px;
	margin-top: 15px;
	margin: 0 auto;
	border: solid 1px;
	border-color: #c4c4c4;
	border-radius: 6px;
	background-color: #ffffff;
	padding-left: 5px;
	&:focus {
		outline: none;
		border: 1px solid #c4c4c4;
	}
`;

const LoginButton = styled.button`
	width: 295px;
	height: 56px;
	background-color: #b51d29;
	color: white;
	border: none;
	border-radius: 6px;
	margin-top: 30px;
	font-size: 16px;
	&:hover {
		cursor: pointer;
	}
`;

const Err = styled.div`
	font-size: 14px;
	color: red;
	margin-top: 2px;
`;

const SignUpButton = styled.div`
	margin-top: 20px;
	font-size: 14px;
	color: gray;
	&:hover {
		cursor: pointer;
	}
`;

const PassWorldCheck = styled.div`
	margin-top: 20px;
	font-size: 14px;
	color: gray;
`;
export default Login;
