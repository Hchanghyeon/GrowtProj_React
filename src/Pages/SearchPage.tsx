import React from "react";
import { Container } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import SearchResult from "../Components/Search/SearchResult";
import LoginModal from "../Components/User/LoginModal";
import GoBack from "../Components/Feature/GoBack";

const SearchPage = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <Container>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />
      <SearchResult />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"search"} />
    </Container>
  );
};

export default SearchPage;
