import React, { useState } from "react";
import styled from "styled-components";

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
  cursor:pointer;
`;

const ErrorMsgDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size:13px;
`;

const UserName = ({ addUser, changeBtn }: any) => {
  const [userName, setUserName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };

  const clickBtn = () => {
    if (userName === "") {
      setErrMsg("이름을 입력해주세요");
    } else {
      const key = "userName";
      const value = userName;
      addUser(key,value);
      changeBtn("UserMail");
    }
  };

  return (
    <>
      {errMsg !== "" ? <ErrorMsgDiv>{errMsg}</ErrorMsgDiv> : null}
      <InputHeader>이름</InputHeader>
      <Input
        type="text"
        placeholder="이름을 입력해주세요"
        onChange={onChangeUserName}
        maxLength={20}
      ></Input>
      <InputButton onClick={clickBtn}>확인</InputButton>
    </>
  );
};

export default UserName;
