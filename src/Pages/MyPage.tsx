import React, { useEffect, useState } from "react";
import { Container } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DELETE_USER } from "../Store/User/User";
import LoginModal from "../Components/User/LoginModal";
import styled from "styled-components";
import { BASE_URL } from "../API/Common";
import { getUserInfo } from "../API/User/User";

const Atag = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: silver;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ImgContainer = styled.div`
  max-width: 300px;
  width: 100%%;
  height: 200px;
  @media screen and (max-width: 768px) {
    max-width: 100px;
    height: 100px;
  }
`;

const UserContainer = styled.div`
  max-width: 300px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    max-width: 100px;
    height: 100px;
  }
`;
const UserName = styled.div``;

const Lv = styled.div``;

const HeaderContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 90%;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
  border-bottom-width: 2px;
`;

const NoLoginHeaderContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 90%;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
`;


const MyPage = ({ userLoginBtn, changeLoginState }: any) => {
  const userLoginState = useSelector((state: any) => state.user.authenticated);
  const userId = useSelector((state: any) => state.user.userId);
  const userLoginImg = useSelector((state: any) => state.user.imgSrc);
  const accessToken = useSelector((state: any) => state.user.accessToken);

  const [userData, setUserData] = useState<any>({});

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(DELETE_USER());
    setTimeout(() => {
      location.href = "/";
    }, 200);
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserInfo({ userId, accessToken });
      setUserData(data.json.data);
    };
    getUser();
  }, []);

  return (
    <Container>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />

        {userLoginState ? (
                <HeaderContainer>
            <ImgContainer>
              <Img src={`${BASE_URL}${userLoginImg}`}></Img>
            </ImgContainer>
            <UserContainer>
              <UserName>{userData.userName}님</UserName>
              <Lv>Lv. 20 </Lv>
            </UserContainer>
            <Atag onClick={logout}>로그아웃</Atag>
            </HeaderContainer>
        ) : (
          <NoLoginHeaderContainer>
          <Atag onClick={changeLoginState}>로그인</Atag>
          </NoLoginHeaderContainer>
        )}
      <Footer link={"myPage"} />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
    </Container>
  );
};

export default MyPage;
