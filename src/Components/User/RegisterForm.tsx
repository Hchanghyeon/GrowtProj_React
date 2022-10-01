import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserId from "../Register/UserId";
import UserPw from "../Register/UserPw";
import UserBirth from "../Register/UserBirth";
import UserAddr from "../Register/UserAddr";
import UserName from "../Register/UserName";
import UserMail from "../Register/UserMail";

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

const RegisterForm = ({changeLoginState}:any) => {
  const [users, setUsers] = useState<any>({
    userId:'',
    userPw:'',
    userName:'',
    userMail:'',
    userBirth:'',
    userAddr1:'',
    userAddr2:'',
  });
  const [btn, setBtn] = useState<any>("UserId");

  useEffect(() => {
    setUsers({});
    setBtn("UserId");
  },[changeLoginState]);

  const addUser = (key:any, value: any) => {
    setUsers((prevState:any) => {
        let newList = {...prevState};
        newList[key] = value;
        return newList;
    });
  };

  const changeBtn = (next: any) => {
    setBtn(next);
  };

  return (
    <Form>
      {btn === "UserId" ? <UserId addUser={addUser} changeBtn={changeBtn}></UserId> : null}
      {btn === "UserPw" ? <UserPw addUser={addUser} changeBtn={changeBtn}></UserPw> : null}
      {btn === "UserName" ? <UserName addUser={addUser} changeBtn={changeBtn}></UserName> : null}
      {btn === "UserMail" ? <UserMail addUser={addUser} changeBtn={changeBtn}></UserMail> : null}
      {btn === "UserBirth" ? <UserBirth addUser={addUser} changeBtn={changeBtn}></UserBirth> : null}
      {btn === "UserAddr" ? <UserAddr addUser={addUser} changeBtn={changeBtn}></UserAddr> : null}
    </Form>
  );
};

export default RegisterForm;
