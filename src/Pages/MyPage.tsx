import React from "react";
import { Container } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const MyPage = () => {
  return (
    <Container>
      <Header />
        마이페이지입니다.
      <Footer link={'myPage'}/>
    </Container>
  );
};

export default MyPage;