import React, { useState } from "react";
import styled from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { loginUser } from "../api/login"; // login.js에서 작성한 로그인 함수

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #FDFBF1;
`;

const LoginBox = styled.div`
    background: #DAE9FE;
    padding: 20px 80px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.8);
`;

const Title = styled.h1`
    font-size: 30px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: white;
    outline: none;

    &:focus {
        background-color: #fff;
    }
`;

const Button = styled.button`
    font-size: 15px;
    font-weight: bold;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 50px;
    background: #7986cb;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #3f51b5;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`;

const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 55%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

export default function Login() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Login.js
    const handleLogin = async () => {
        if (!userid || !password) {
            setError("아이디와 비밀번호는 필수입니다.");
            return;
        }

        setError("");

        try {
            const userData = await loginUser(userid, password);
            Swal.fire({
                icon: "success",
                title: "로그인 성공!",
                text: `${userData.username}님 환영합니다!`,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                timerProgressBar: true,
            });

            // 로그인 성공 후 페이지 리디렉션
            window.location.href = `/home?userid=${userid}`;  // 로그인한 userid를 쿼리 파라미터로 전달
        } catch (error) {
            setError(error.message || "로그인 실패. 아이디와 비밀번호를 확인해주세요.");
            Swal.fire({
                icon: "error",
                title: "로그인 실패!",
                text: "아이디와 비밀번호를 확인해주세요.",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                timerProgressBar: true,
            });
        }
    };


    return (
        <Container>
            <LoginBox>
                <Title>Todo List!</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <Input
                        type="text"
                        placeholder="User ID"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                    />
                    <div style={{ position: "relative" }}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ToggleButton
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </ToggleButton>
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </LoginBox>
        </Container>
    );
}
