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
  margin-top: 20px;
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
  cursor: pointer;
`;

const RadioContainer = styled.div`
margin-bottom:20px;`;

const InputRadio = styled.input`
margin-right:20px`;

const ErrorMsgDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const UserBirth = ({ addUser, changeBtn }: any) => {
  const [userBirth, setUserBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const onChangeUserBirth = (e: any) => {
    setUserBirth(e.target.value);
  };

  const onChangeUserGender = (e: any) => {
    setUserGender(e.target.value);
  };

  const clickBtn = () => {
    if(userBirth === '' || userGender === ''){
      setErrMsg("모든 항목을 다 채워주세요");
    } else {
      addUser("userBirth", userBirth);
      addUser("userGender", userGender);
      changeBtn("UserAddr");
    }
  };

  return (
    <>
      {errMsg !== "" ? <ErrorMsgDiv>{errMsg}</ErrorMsgDiv> : null}
      <InputHeader>생년월일</InputHeader>
      <Input type="date" onChange={onChangeUserBirth} />
      <InputHeader>성별</InputHeader>
      <RadioContainer>
        남자
        <InputRadio
          type="radio"
          name="gender"
          value="남자"
          onChange={onChangeUserGender}
        />
        여자
        <InputRadio
          type="radio"
          name="gender"
          value="여자"
          onChange={onChangeUserGender}
        />
      </RadioContainer>
      <InputButton onClick={clickBtn}>확인</InputButton>
    </>
  );
};

export default UserBirth;
