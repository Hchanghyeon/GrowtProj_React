import React from "react";
import { Container } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const SearchPage = () => {
  return (
    <Container>
      <Header />
        검색페이지입니다.
      <Footer link={'search'}/>
    </Container>
  );
};

export default SearchPage;