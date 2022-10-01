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
`;

const ErrorMsgDiv = styled.div`
  width: 100%;
  text-align:center;
`;

const UserPw = ({ addUser, changeBtn }: any) => {
  const [userPw, setUserPw] = useState("");
  const [userPw2, setUserPw2] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const checkSamePW = () => {
    if(userPw !== userPw2){
        setErrMsg('비밀번호가 틀립니다');
        return false;
    } else {
        setErrMsg('');
        return true;
    }
  }

  const onChangeUserPw = (e: any) => {
    setUserPw(e.target.value);
  };

  const onChangeUserPw2 = (e: any) => {
    setUserPw2(e.target.value);
  };

  const clickBtn = () => {
    if(userPw === "" || userPw2 === ""){
        setErrMsg('비밀번호를 입력하세요');
    } else {
        const result = checkSamePW();
        if(result === true){
            const key = 'userPw';
            const value = userPw;
            addUser(key, value);
            changeBtn("UserName");
        }
    }
  };

  return (
    <>
      {errMsg !== "" ? <ErrorMsgDiv>{errMsg}</ErrorMsgDiv> : null}
      <InputHeader>패스워드</InputHeader>
      <Input
        type="password"
        onChange={onChangeUserPw}
        placeholder="비밀번호를 입력하세요"
        maxLength={20}
      />
      <Input
        type="password"
        onChange={onChangeUserPw2}
        placeholder="비밀번호를 한 번 더 입력하세요"
        maxLength={20}
      />
      <InputButton onClick={clickBtn}>확인</InputButton>
    </>
  );
};

export default UserPw;
