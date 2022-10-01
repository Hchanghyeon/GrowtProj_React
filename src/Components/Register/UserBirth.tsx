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



const UserBirth = ({addUser, changeBtn}:any) => {
    const [userBirth, setUserBirth] = useState("");
    const onChangeUserBirth = (e: any) => {
        setUserBirth(e.target.value);
      };

      const clickBtn = () => {
        changeBtn('UserPw');
      }
    

      return (
        <>
          <InputHeader>아이디</InputHeader>
          <Input></Input>
          <InputButton>확인</InputButton>
        </>
      );
}

export default UserBirth;