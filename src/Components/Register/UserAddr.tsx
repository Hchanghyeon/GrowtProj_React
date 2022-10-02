import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

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
  cursor: pointer;
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


const UserAddr = ({ addUser, changeBtn }: any) => {
  const [userAddr1, setUserAddr1] = useState("");
  const [userAddr2, setUserAddr2] = useState("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [addPostcode, setAddPostcode] = useState<boolean>(false);


  const onChangeUserAddr1 = (e: any) => {
    setUserAddr1(e.target.value);
  };

  const onChangeUserAddr2 = (e: any) => {
    setUserAddr2(e.target.value);
  };

  const clickBtn = () => {
    addUser("userAddr1", userAddr1);
    addUser("userAddr2", userAddr2);
    changeBtn("FinishBtn");
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
      setAddPostcode(false);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setUserAddr1(data.address);
      setAddPostcode(true);
      setOpenPostcode(false);
    },
  };

  return (
    <>
      <InputHeader>주소</InputHeader>
      {addPostcode ? 
      <>
        <Input type="text" value={userAddr1} disabled/>
        <Input type="text" placeholder="상세 주소를 입력하세요" onChange={onChangeUserAddr2}/>
      </> : null}
      {openPostcode && (
        <DaumPostcode
          onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="동양미래대학교" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      )}
         <InputButton onClick={handle.clickButton}>주소 찾기</InputButton>
      {userAddr2 !== '' ? <CheckButton onClick={clickBtn}>확인</CheckButton> : null}
    </>
  );
};

export default UserAddr;
