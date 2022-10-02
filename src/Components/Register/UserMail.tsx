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
  cursor:pointer;

  #btndis {
    background-color:silver;
    color:white;
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
  cursor:pointer;
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
  const [startTimer, setStartTimer] = useState(false);
  const [btnClick, setBtnClick] = useState('');
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(180);
  const [submitClick, setSubmitClick] = useState(false);
  const intervalRef = useRef<any>(null);
 
  const onChangeUserMail = (e: any) => {
    setUserMail(e.target.value);
  };

  const onChangeNumber = (e: any) => {
    setNumber(e.target.value);
  }

  const clickBtn = () => {
    addUser("userMail", userMail);
    changeBtn("UserBirth");
  };

  const sendMail = async () => {
    const data: any = await sendEmail({ email: userMail });
    if (data.json.result === "error") {
      setErrMsg("이메일 전송에 실패했습니다. 제대로 입력했는지 확인하세요");
    } else {
      start();
      setStartTimer(true);
      setBtnClick(data.json.result);
    }
  };

  const sameNumCheck = () => {
    if(number == parseInt(btnClick)){
        setSubmitClick(true);
    }else{
       setErrMsg('인증번호가 맞지 않습니다');
    }
  }

    const start:any = () => {
        intervalRef.current = setInterval(() => {
            setCounter(c => c -1);
        },1000);
    } 

    const stop:any = () => {
      clearInterval(intervalRef.current);
    }

  return (
    <>
      {startTimer ? <TimerDiv>{`${counter}초 남았습니다`}</TimerDiv> :null }
      {counter < 1 ? stop() : null}
      {errMsg !== "" ? <ErrorMsgDiv>{errMsg}</ErrorMsgDiv> : null}
      <InputHeader>이메일</InputHeader>
      <Input type="email" onChange={onChangeUserMail}></Input>
      {btnClick !== '' ? 
      <>
      <Input type="number" onChange={onChangeNumber} />
      <CheckButton onClick={sameNumCheck}> 인증</CheckButton> 
      </>: <CheckButton onClick={sendMail}>인증번호 발송</CheckButton>
      }
      {submitClick ? <InputButton onClick={clickBtn}>확인</InputButton> : null}
      
    </>
  );
};

export default UserMail;
