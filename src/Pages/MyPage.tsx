import React from "react";
import { Container } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DELETE_USER} from "../Store/User/User";
import LoginModal from "../Components/User/LoginModal";

const MyPage = ({ userLoginBtn, changeLoginState }: any) => {
  const userLoginState = useSelector((state: any) => state.user.authenticated);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(DELETE_USER());
  };

  return (
    <Container>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />
      {userLoginState ? (
        <a onClick={logout}>로그아웃</a>
      ) : (
        <a onClick={changeLoginState}>로그인하시겠습니까?</a>
      )}
      마이페이지입니다.
      <Footer link={"myPage"} />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
    </Container>
  );
};

export default MyPage;
