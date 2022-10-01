import React, { useState } from "react";
import styled from "styled-components";
import { checkUser } from "../../API/User/User";

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

const CheckButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: white;
  border-style: solid;
  border-color: #83b551;
  border-width: 1px;
  color: #83b551;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ErrMessage = styled.div``;

const UserId = ({ addUser, changeBtn }: any) => {
  const [userId, setUserId] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const onChangeUserId = (e: any) => {
    setUserId(e.target.value);
  };

  const clickBtn = async () => {
    if (userId === "") {
      setErrMsg("아이디를 입력해주세요");
    } else {
      const userInfo = {
        userId: userId,
      };
      const data: any = await checkUser(userInfo);
      if (data.json.result === true) {
        setErrMsg("이미 있는 아이디입니다");
      } else {
        const key="userId";
        const value=userId;
        addUser(key, value);
        changeBtn("UserPw");
      }
    }
  };

  const checkId = async () => {
    if (userId === "") {
      setErrMsg("아이디를 입력해주세요");
    } else {
      const userInfo = {
        userId: userId,
      };
      const data: any = await checkUser(userInfo);
      if (data.json.result === true) {
        setErrMsg("이미 있는 아이디입니다");
      } else {
        setErrMsg("사용 가능한 아이디입니다");
      }
    }
  };

  return (
    <>
      {errMsg !== "" ? <ErrMessage>{errMsg}</ErrMessage> : null}
      <InputHeader>아이디</InputHeader>
      <Input
        type="text"
        maxLength={20}
        placeholder="아이디를 입력하세요"
        onChange={onChangeUserId}
        required
      ></Input>
      <CheckButton onClick={checkId}>중복확인</CheckButton>
      <InputButton onClick={clickBtn}>확인</InputButton>
    </>
  );
};

export default UserId;
