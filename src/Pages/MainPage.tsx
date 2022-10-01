import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Navigation from "../Components/Navigation/Navigation";
import { Container } from "../Styles/theme";
import Footer from "../Components/Footer/Footer";
import Section from "../Components/Main/SectionSpot";
import Map from "../Components/Main/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import SectionSpot from "../Components/Main/SectionSpot";
import SectionAssay from "../Components/Main/SectionAssay";
import LoginModal from "../Components/User/LoginModal";
import { useSelector } from "react-redux";

const MapBtn = styled.button`
  position: fixed;
  bottom: 75px;
  width: 100px;
  background-color: #222222;
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

const MapRef = styled.div`
  margin-right: 5px;
`;

function MainPage() {
  const [clickMapBtn, setClickMapBtn] = useState<boolean>(false);
  const [userClickBtn, setUserClickBtn] = useState<string>("");
  const [assayClickBtn, setAssayClickBtn] = useState<boolean>(false);
  const [userLoginBtn, setUserLoginBtn] = useState<boolean>(false);

  const changeState = () => {
    setClickMapBtn(!clickMapBtn);
  };

  const changeLoginState = () => {
    setUserLoginBtn(!userLoginBtn);
  };

  const selectCategory = (value: any) => {
    let requestValue: string;
    if (value === "all") {
      requestValue = "";
      setAssayClickBtn(false);
    } else if (value === "spot") {
      requestValue = "c1";
      setAssayClickBtn(false);
    } else if (value === "food") {
      requestValue = "c4";
      setAssayClickBtn(false);
    } else if (value === "stay") {
      requestValue = "c3";
      setAssayClickBtn(false);
    } else if (value === "assay") {
      requestValue = "assay";
      setAssayClickBtn(true);
    } else {
      requestValue = "";
      setAssayClickBtn(false);
    }
    setUserClickBtn(requestValue);
  };



  return (
    <Container>
      <Header
        changeLoginState={changeLoginState}
      />
      <Navigation selectCategory={selectCategory}></Navigation>
      {clickMapBtn ? (
        <Map userClickBtn={userClickBtn} />
      ) : assayClickBtn ? (
        <SectionAssay userClickBtn={userClickBtn}></SectionAssay>
      ) : (
        <SectionSpot userClickBtn={userClickBtn} />
      )}
      <MapBtn onClick={changeState}>
        {clickMapBtn ? <MapRef>목록 보기</MapRef> : <MapRef>지도</MapRef>}
        <FontAwesomeIcon icon={faMap} />
      </MapBtn>
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"home"}></Footer>
    </Container>
  );
}

export default MainPage;
