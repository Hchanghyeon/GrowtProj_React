import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Container } from "../Styles/theme";
import LoginModal from "../Components/User/LoginModal";
import SectionSpotInfo from "../Components/Spot/SectionSpotInfo";

const SpotInfoPage = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <Container>
      <Header changeLoginState={changeLoginState}></Header>
      <SectionSpotInfo />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"home"}></Footer>
    </Container>
  );
};

export default SpotInfoPage;
