import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { config } from "../../Config/Config";
import { signin } from "../../API/User/User";
import { SET_USER } from "../../Store/User/User";
import Loading from "../Loading/Loading";

const Form = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Input = styled.input`
  width: calc(100% - 11px);
  height: 50px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 5px 0px;
  padding: 0px;
  padding-left: 10px;
  border-color: silver;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const InputHeader = styled.div`
  width: calc(100% - 1px);
  margin-top: 10px;
`;

const InputButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: #83b551;
  border-style: none;
  color: white;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ValidationId = styled.div`
  color: red;
  font-size: 10px;
  padding-left: 10px;
  width: calc(100% - 10px);
`;

const ValidationPassword = styled.div`
  color: red;
  font-size: 10px;
  padding-left: 10px;
  width: calc(100% - 10px);
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const LoginForm = ({ changeLoginState }: any) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorId, setErrorId] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeUserId = (e: any) => {
    setUserId(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setUserPassword(e.target.value);
  };

  const onClickLoginBtn = async () => {
    if (userId === "" && userPassword === "") {
      setErrorId(true);
      setErrorPassword(true);
    } else if (userId === "") {
      setErrorId(true);
      if (userPassword !== "") {
        setErrorPassword(false);
      }
    } else if (userPassword === "") {
      setErrorPassword(true);
      if (userId !== "") {
        setErrorId(false);
      }
    } else {
      setErrorPassword(false);
      setErrorId(false);
      const userInfo = {
        userId: userId,
        userPw: userPassword,
      };

      const data: any = await signin(userInfo);
      if (data.json.message) {
        setErrorMsg("아이디 또는 비밀번호가 틀렸습니다");
      } else {
        const payload = {
          accessToken: data.json.accessToken,
          imgSrc: data.json.imgSrc,
          userId: data.json.userId,
        };
        dispatch(SET_USER(payload));
        changeLoginState(); // 모달 닫기
        setErrorMsg("");
        setTimeout(() => {
          window.location.href = "/";
        }, 1);
      }
    }
  };

  return (
    <Form>
      {errorMsg !== "" ? <ErrorMsg>{errorMsg}</ErrorMsg> : null}
      <InputHeader>아이디</InputHeader>
      <Input
        type="text"
        placeholder="아이디를 입력하세요"
        value={userId}
        onChange={onChangeUserId}
        maxLength={20}
        required
      />
      {errorId ? <ValidationId>아이디를 입력해주세요</ValidationId> : null}
      <InputHeader>패스워드</InputHeader>
      <Input
        type="password"
        placeholder="패스워드를 입력하세요"
        value={userPassword}
        maxLength={20}
        onChange={onChangePassword}
        required
      />
      {errorPassword ? (
        <ValidationPassword>패스워드를 입력해주세요</ValidationPassword>
      ) : null}
      <InputButton onClick={onClickLoginBtn}>로그인</InputButton>
    </Form>
  );
};

export default LoginForm;
