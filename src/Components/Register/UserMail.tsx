import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sendEmail } from "../../API/User/User";

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

const ErrorMsgDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const TimerDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const UserMail = ({ addUser, changeBtn }: any) => {
  const [userMail, setUserMail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [counter, setCounter] = useState(180);
  const [timer, setTimer] = useState("");
  const [startTimer, setStartTimer] = useState(false);
  const [btnClick, setBtnClick] = useState('');
  const [number, setNumber] = useState(0);
  const counterRef = useRef(180);
  const onChangeUserMail = (e: any) => {
    setUserMail(e.target.value);
  };

  const onChangeNumber = (e: any) => {
    setNumber(e.target.value);
  }
  useEffect(() => {
    const timerCounter = setInterval(() => {
      if (counter < 170) {
        console.log('동작');
        clearInterval(timerCounter);
      }
      const minute = parseInt((counter / 60).toString());
      const second = counter % 60;
      setTimer(`${minute}분 ${second}초 남았습니다`);
      setCounter((counterRef.current -= 1));
    }, 1000);
    return () => clearInterval(timerCounter);
  }, [counter]);

  const clickBtn = () => {
    changeBtn("UserPw");
  };

  const sendMail = async () => {
    const data: any = await sendEmail({ email: userMail });
    if (data.json.result === "error") {
      setErrMsg("이메일 전송에 실패했습니다. 제대로 입력했는지 확인하세요");
    } else {
      setStartTimer(true);
      setBtnClick(data.json.result);
    }
  };

  const sameNumCheck = () => {
    console.log(number, parseInt(btnClick));
    if(number == parseInt(btnClick)){
        console.log('동일함');
    }else{
        console.log('틀림');
    }
  }

  return (
    <>
      {counter > 0 ? <TimerDiv>{timer}</TimerDiv> : null}
      {errMsg !== "" ? <ErrorMsgDiv>{errMsg}</ErrorMsgDiv> : null}
      <InputHeader>이메일</InputHeader>
      <Input type="email" onChange={onChangeUserMail}></Input>
      {btnClick !== '' ? 
      <>
      <Input type="number" onChange={onChangeNumber} />
      <CheckButton onClick={sameNumCheck}> 인증</CheckButton> 
      </>: <CheckButton onClick={sendMail}>인증번호 발송</CheckButton>
      }<InputButton>확인</InputButton>
    </>
  );
};

export default UserMail;
