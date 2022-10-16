import React, { useEffect, useState } from "react";
import { MyPageContainer } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import LoginModal from "../Components/User/LoginModal";
import Loading from "../Components/Loading/Loading";
import ShowAssay from "../Components/Assay/ShowAssay";
import MapAssay from "../Components/Assay/MapAssay";
import HeaderAssay from "../Components/Assay/HeaderAssay";
import styled from "styled-components";
import AssayAdd from "../Components/Assay/AssayAdd";

const AddAssayBtnDiv = styled.div`
  position: fixed;
  bottom: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 20px;
  border-style: none;
  height: 50px;
  z-index: 30px;
`;

const AddAssayBtn = styled.button`
  width: 100px;
  margin: auto;
  background-color: #83b551;
  border-radius: 20px;
  border-style: none;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  z-index: 30px;
`;

const MyAssay = ({ userLoginBtn, changeLoginState }: any) => {
  const [loading, setLoading] = useState(false);
  const [clickedAddBtn, setClickAddBtn] = useState(false);
  const [userMatch, setUserMatch] = useState(false);

  const showAddAssay = () => {
    setClickAddBtn(!clickedAddBtn);
  };

  return (
    <MyPageContainer>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />
      {clickedAddBtn ? <AssayAdd clickedAddBtn={clickedAddBtn}/> : (
        <>
          <HeaderAssay
            setUserMatch={setUserMatch}
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
          <MapAssay />
          <ShowAssay />
        </>
      )}
      <Footer link={"myPage"} />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      {userMatch ? (
        <AddAssayBtnDiv>
          <AddAssayBtn onClick={showAddAssay}>여행일지 작성</AddAssayBtn>
        </AddAssayBtnDiv>
      ) : null}
    </MyPageContainer>
  );
};

export default MyAssay;
