import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginModalContainer = styled.div`
  .open {
    justify-content: center;
    align-items: center;
    background: rgb(34, 34, 34, 0.5) !important;
    position: fixed;
    inset: 0px;
    display: flex;
  }

  .close {
    background: rgb(34, 34, 34) !important;
    position: fixed;
    opacity: 0;
    inset: 0px;
    display: none;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  .LoginModal {
    max-width: 560px;
    width: 90%;
    padding: 100px 0px;
    background-color: white;
    border-radius: 10px;
    visibility: visible;
    animation: fadeInUp 1s;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .LoginModalClose {
    visibility: hidden;
    background-color: white;
    border-radius: 40px;
  }
`;

const LoginHeader = styled.div`
  height:70px;
  width:100%;
  border-bottom-style:solid;
  border-bottom-color:silver;
  border-bottom-width:1px;
  display:flex;
  justify-content:center;
  align-items:center;
  position: absolute;
  top:0px;

  #Xbtn {
    font-size:13px;
    position:absolute;
    left:20px;
src/API/User/User.ts  }
`;

const LoginHeaderText = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const RegisterBtnContainer = styled.div`
    width:90%;
    display:flex;
    justify-content:end;
    align-items:center;
`
const RegisterBtn = styled.a`
font-size:13px;
    background-color:white;
    border-style:none;
    color:silver;
`;

const LoginModal = ({ userLoginBtn, changeLoginState }: any) => {
  const outSection = useRef<any>();
  const [userLogin, setUserLogin] = useState("login");

  useEffect(() => {
    setUserLogin("login");
  }, [changeLoginState]);

  return (
    <LoginModalContainer>
      <div
        className={userLoginBtn ? "open" : "close"}
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            changeLoginState();
          }
        }}
      >
        <div className={userLoginBtn ? "LoginModal" : "LoginModalClose"}>
        <RegisterBtnContainer>
          {userLogin === "login" ? (
            <RegisterBtn
              onClick={() => {
                setUserLogin("register");
              }}
            >
              회원이 아니신가요? 회원가입
            </RegisterBtn>
          ) : (
            <RegisterBtn
              onClick={() => {
                setUserLogin("login");
              }}
            >
              회원이신가요? 로그인
            </RegisterBtn>
          )}
          </RegisterBtnContainer>
          <LoginHeader>
            <FontAwesomeIcon
              onClick={changeLoginState}
              id={"Xbtn"}
              icon={faXmark}
            ></FontAwesomeIcon>
            {userLogin === "login" ? (
              <LoginHeaderText>로그인</LoginHeaderText>
            ) : (
              <LoginHeaderText>회원가입</LoginHeaderText>
            )}
          </LoginHeader>
          {userLogin === "login" ? (
            <LoginForm changeLoginState={changeLoginState}></LoginForm>
          ) : (
            <RegisterForm changeLoginState={changeLoginState}></RegisterForm>
          )}
        </div>
      </div>
    </LoginModalContainer>
  );
};

export default LoginModal;
