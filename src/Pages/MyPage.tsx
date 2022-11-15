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
import MyPageLikeSpot from "../Components/User/MyPageLikeSpot";
import MyPageLikeAssay from "../Components/User/MyPageLikeAssay";
import { ResponsiveBullet } from "@nivo/bullet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

const Atag = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: silver;
  @media screen and (max-width: 768px) {
  }
`;

const AtagMyAssay = styled.a`
  position: absolute;
  top: 40px;
  right: 10px;
  cursor: pointer;
  color: silver;
  @media screen and (max-width: 768px) {
    top: 30px;
  }
`;

const Img = styled.img`
  max-width: 200px;
  width: 100%;
  border-radius: 100px;
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ImgContainer = styled.div`
  width: 20%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 25%;
    height: 100px;
  }
`;

const UserContainer = styled.div`
  width: 60%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 50%;
    height: 100px;
  }
`;
const UserName = styled.div`
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Lv = styled.div`
  color: silver;
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

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

const SectionContainer = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  justify-content: center;
  margin-bottom: 100px;
  @media screen and (max-width: 1268px) {
    flex-wrap: wrap;
  }
`;

const UserCharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserCharacterImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  @media screen and (max-width: 1268px) {
    width: 50px;
    height: 50px;
  }
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;
const UserCharacterExplain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;

const UserExpBox = styled.div``;

const LoginContainer = styled.div`
  width: 20%;
  height: 100%;
  @media screen and (max-width: 768px) {
    font-size: 13px;
    width: 25%;
    height: 100px;
  }
`;

const BtnText = styled.div`
  font-size: 9px;
`;

const ExpText = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const DialogImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0px auto;
  height: 250px;
`;

const DialogImg = styled.img`
  width: 200px;
  height: 200px;
`;

const DialogTextDiv = styled.div``;

const DialogHeaderDiv = styled.div`
  text-align: center;
`;

const DialogLvDiv = styled.div``;

const DialogGraphDiv = styled.div``;

const MyPage = ({ userLoginBtn, changeLoginState }: any) => {
  const userLoginState = useSelector((state: any) => state.user.authenticated);
  const userId = useSelector((state: any) => state.user.userId);
  const userLoginImg = useSelector((state: any) => state.user.imgSrc);
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [graphData, setGraphData] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>({});

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(DELETE_USER());
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  const goMyAssay = () => {
    window.location.href = "/user/myAssay";
  };

  // 지도 모달 취소 버튼 클릭시 닫기
  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const data: any = await getUserInfo({ userId, accessToken });
      if (accessToken) {
        if (data.code === 401) {
          logout();
        }
      }
      setUserData(data.json.data);
      setGraphData([
        { id: "exp", ranges: [0, 100], measures: data.json.data.userExp },
      ]);
    };
    getUser();
  }, []);

  return (
    <Container>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />
      {userLoginState ? (
        <>
          <HeaderContainer>
            <ImgContainer>
              <Img src={`${BASE_URL}${userLoginImg}`}></Img>
            </ImgContainer>
            <UserContainer>
              <UserBox>
                <UserName>{userData.userName}</UserName>
                <Lv>Lv. {userData.userLevel} </Lv>
              </UserBox>
              <UserCharacterBox>
                <UserCharacterImg src={`/img/level${userData.ch_idx}.png`} />
                <UserCharacterExplain>
                  {userData.Character && userData.Character.ch_name}
                  <Button
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      setModal(true);
                    }}
                    variant="contained"
                    color="success"
                  >
                    <BtnText>캐릭터정보</BtnText>
                  </Button>
                </UserCharacterExplain>
              </UserCharacterBox>
            </UserContainer>
            <LoginContainer>
              <Atag onClick={logout}>로그아웃</Atag>
              <AtagMyAssay onClick={goMyAssay}>나의 여행일지</AtagMyAssay>
            </LoginContainer>
          </HeaderContainer>
          <SectionContainer>
            <MyPageLikeSpot />
            <MyPageLikeAssay />
          </SectionContainer>
        </>
      ) : (
        <NoLoginHeaderContainer>
          <Atag onClick={changeLoginState}>로그인</Atag>
        </NoLoginHeaderContainer>
      )}
      <Dialog open={modal}>
        <DialogTitle id="responsive-dialog-title">
          <div>나의 캐릭터 정보</div>
        </DialogTitle>
        <DialogContent style={{ width: "300px", height: "380px" }}>
          <DialogContentText>
            <DialogImgDiv>
              <DialogImg src={`/img/level${userData.ch_idx}.png`}></DialogImg>
            </DialogImgDiv>
            <DialogTextDiv>
              <DialogHeaderDiv>
                {userData.Character && userData.Character.ch_name}
              </DialogHeaderDiv>
              <DialogLvDiv>LV.{userData.userLevel}</DialogLvDiv>
              <DialogGraphDiv>
                <div>Exp.</div>
                <div></div>
              </DialogGraphDiv>
            </DialogTextDiv>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <div>확인</div>
          </Button>
        </DialogActions>
      </Dialog>

      <Footer link={"myPage"} />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
    </Container>
  );
};

export default MyPage;
