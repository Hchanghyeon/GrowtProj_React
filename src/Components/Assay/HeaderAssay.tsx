import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserAssay } from "../../API/Assay/Assay";
import { DELETE_USER } from "../../Store/User/User";
import styled from "styled-components";
import { BASE_URL } from "../../API/Common";
import { getUserInfo } from "../../API/User/User";
import Loading from "../Loading/Loading";
import HeaderAssayUserInfo from "./HeaderAssayUserInfo";



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
position:relative;
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

  @media screen and (max-width: 768px) {
   max-width:400px;
   width:90%;
  }
`;


const HeaderAssay = ({ userLoginBtn, changeLoginState }: any) => {
  const userLoginState = useSelector((state: any) => state.user.authenticated);
  const userId = useSelector((state: any) => state.user.userId);
  const userLoginImg = useSelector((state: any) => state.user.imgSrc);
  const [userAssay, setUserAssay] = useState<any>([]);
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [assayCount, setAssayCount] = useState(0);
  const [assayLikeCount, setAssayLikeCount] = useState(0);

  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    setLoading(true);
    dispatch(DELETE_USER());
    setTimeout(() => {
      location.href = "/";
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserInfo({ userId, accessToken });
      setUserData(data.json.data);
      const result = await getUserAssay({ userId });
      let countLike = 0;
      setUserAssay(result.json.data);
      setAssayCount(result.json.data.length);
      for(let i=0; i < result.json.data.length; i++){
        countLike += parseInt(result.json.data[i].likeNum);
      }
      setAssayLikeCount(countLike);
    };
    getUser();
  }, []);

  return (
    <HeaderContainer>
      <ImgContainer>
        <Img src={`${BASE_URL}${userLoginImg}`}></Img>
      </ImgContainer>
      <UserContainer>
        <UserName>{userData.userName}님</UserName>
        <Lv>Lv. 20 </Lv>
      </UserContainer>
      {userLoginState ? (
        <Atag onClick={logout}>로그아웃</Atag>
      ) : (
        <Atag onClick={changeLoginState}>로그인</Atag>
      )}
      <HeaderAssayUserInfo assayLikeCount={assayLikeCount} assayCount={assayCount} />
      {loading ? <Loading text="로그아웃중입니다"/> : null}
    </HeaderContainer>
    
  );
};
export default HeaderAssay;
