import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getlist, postList, deleteList } from "../api/Home.js"; // getlist 함수 import
import { FaRegTrashCan } from "react-icons/fa6";
import "./button.css";
import '../App.css';
import Swal from 'sweetalert2';

// Styled-components
const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #FDFBF1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

const UserInfoContainer = styled.div`
    width: 30rem;
    text-align: center;
    margin-top: 3rem;
`;

const UserInfoLine = styled.div`
    background-color: #DAE9FE;
    width: 30rem;
    height: 0.3rem;
    margin-top: 0.5rem;
    border-radius: 1rem;
`;

const UserInfo = styled.h1`
    color: black;
    font-size: 2.7rem;
    font-family: MainFont;
`;

const ToDoListContainer = styled.div`
    width: 50rem;
    height: 50rem;
    padding: 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 0.3rem solid #DAE9FE;
    border-left: 0.3rem solid #DAE9FE;
    border-right: 0.3rem solid #DAE9FE;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    background-color: white;
`;

const InsertContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`;

const InsertText = styled.label`
    color: black;
    font-size: 1.5rem;
    margin-right: 1rem;
    font-family: MainFont;
`;

const InsertTitle = styled.input`
    width: 25rem;
    height: 2rem;
    margin-right: 1rem;
    padding: 0 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    background: linear-gradient(145deg, #fdfdfd, #f5f5f5);
    box-shadow: inset 2px 2px 5px #ccc, inset -2px -2px 5px #fff;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 8px rgba(100, 149, 237, 0.8); /* 포커스 상태 */
    }
`;

const InsertButton = styled.button`
    width: 5rem;
    height: 2.3rem;
    font-size: 1rem;
    background: linear-gradient(145deg, #c5d7ff, #e6f0ff); /* 입체감 효과 */
    box-shadow: 2px 2px 5px #aaa, -2px -2px 5px #fff; /* 음영 효과 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        background: linear-gradient(145deg, #a7d1ff, #cde5ff);
    }

    &:active {
        box-shadow: inset 2px 2px 5px #aaa, inset -2px -2px 5px #fff;
    }

    font-family: MainFont;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
`;

const Tr = styled.tr`
    display: flex;
    align-items: center;
    justify-content: space-between; /* 내부 요소를 좌, 중, 우로 정렬 */
    border-bottom: 0.1rem solid black;
    padding: 0.5rem 0;
    margin-right: 1rem;
    font-size: 1.3rem;
    font-family: MainFont;
`;

const Td = styled.div`
    flex: 1; 
    display: flex;
    align-items: center;
`;

const CheckBoxWrapper = styled.div`
    margin-left: 1rem;
`;

const CenterTd = styled(Td)`
    justify-content: center; 
    text-align: center;
`;

const ButtonContainer = styled(Td)`
    justify-content: flex-end; 
    gap: 5px; 
`;

const StyledTrashIcon = styled(FaRegTrashCan)`
    color: black; 
    font-size: 0.8rem;
`;


const CustomCheckBox = styled.input`
    display: none; /* 기본 체크박스를 숨깁니다 */

    &:checked + label {
        background-color: #A7D1FF;
        border-color: #A7D1FF;
    }
`;

const CheckBoxLabel = styled.label`
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    position: relative;
    background: linear-gradient(145deg, #f5f5f5, #dcdcdc); /* 입체감 */
    box-shadow: 2px 2px 5px #aaa, -2px -2px 5px #fff; /* 외부 음영 */
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background: linear-gradient(145deg, #e0e0e0, #c6c6c6);
    }

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 7px;
        width: 0.4rem;
        height: 0.8rem;
        border: solid #fff;
        border-width: 0 0.2rem 0.2rem 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    input:checked + &::after {
        opacity: 1;
    }

    input:checked + & {
        background: linear-gradient(145deg, #a7d1ff, #dce5ff);
        box-shadow: inset 2px 2px 5px #aaa, inset -2px -2px 5px #fff; /* 내부 음영 */
    }
`;





export default function Home() {
    const [toDoList, setToDoList] = useState([]);
    const [title, setTitle] = useState("");
    const location = useLocation();  // useLocation을 사용하여 현재 URL의 쿼리 파라미터를 읽어옵니다.
    const userid = new URLSearchParams(location.search).get('userid');  // 쿼리 파라미터에서 'userid'를 가져옵니다.

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        try {
            const res = await getlist();
            setToDoList(res);
        } catch (err) {
            console.error("Error fetching list:", err);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Title cannot be empty!");
            return;
        }

        try {
            const newItem = await postList(title);
            setToDoList((prev) => [...prev, newItem]);
            setTitle("");
        } catch (err) {
            console.error("Error adding item:", err);
            alert("Failed to add the item. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteList(id);
            setToDoList((prev) => prev.filter((item) => item.id !== id));

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Deleted!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } catch (err) {
            console.error("Error deleting item:", err);
            Swal.fire({
                icon: 'error',
                title: '삭제 실패',
                text: '삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
            });
        }
    };

    return (
        <Background>
            <UserInfoContainer>
                <UserInfo>{userid}'s ToDo List</UserInfo> {/* 로그인한 사용자의 아이디를 표시 */}
                <UserInfoLine />
            </UserInfoContainer>

            <ToDoListContainer>
                <InsertContainer>
                    <InsertText>Todo</InsertText>
                    <InsertTitle
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InsertButton onClick={handleSubmit}>Submit</InsertButton>
                </InsertContainer>
                <Table>
                    <tbody>
                    {toDoList?.map((item) => (
                        <Tr key={item.id}>
                            <Td>
                                <CheckBoxWrapper>
                                    <CustomCheckBox type="checkbox" id={`check-${item.id}`} />
                                    <CheckBoxLabel htmlFor={`check-${item.id}`} />
                                </CheckBoxWrapper>
                            </Td>
                            <CenterTd>{item.title}</CenterTd>
                            <Td>
                                <ButtonContainer>
                                    <div
                                        className="button"
                                        style={{ width: "60px", height: "30px" }}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <p className="btnText" style={{ fontSize: "10px" }}><StyledTrashIcon /></p>
                                    </div>
                                </ButtonContainer>
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </Table>
            </ToDoListContainer>
        </Background>
    );
}