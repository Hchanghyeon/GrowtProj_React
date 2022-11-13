import React from "react";
import styled from "styled-components";
import { MyPageContainer } from "../Styles/theme";
import Header from "../Components/Header/Header";
import LoginModal from "../Components/User/LoginModal";
import Footer from "../Components/Footer/Footer";
import Character from "../Components/Character/Character";

const CharacterPage = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <MyPageContainer>
      <Header changeLoginState={changeLoginState}></Header>
      <Character />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"character"}></Footer>
    </MyPageContainer>
  );
};

export default CharacterPage;
