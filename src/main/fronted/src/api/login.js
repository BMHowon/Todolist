import defaultAxios from "./common";

// 로그인 요청
export const loginUser = async (userid, password) => {
    try {
        const response = await defaultAxios.post("/login", {
            userid,
            password,
        });
        return response.data; // { username: "Howon" }
    } catch (error) {
        console.error("Login failed:", error);
        throw new Error(`Login error: ${error.response?.data || error.message}`);
    }
};
