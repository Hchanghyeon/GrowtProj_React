import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAssay } from "../API/Assay/Assay";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MyPageContainer } from "../Styles/theme";

const FeedContainer = styled.div`
  max-width: 400px;
  width: 90%;
  height: 100%;
  margin:0 auto;
`;

const Feed = styled.div`
  width:100%;
  height: 600px;
`;

const FeedHeader = styled.div`
    width:100%;
  height: 40px;
  border-style:solid;
  border-color:#efefef;
  border-width:1px;
  display:flex;
  align-items:center;

`;

const FeedHeaderImg = styled.img`
  width: 35px;
  height: 35px;
  margin-left:10px;
  border-radius:15px;
`;

const FeedContent =  styled.div`
  width:100%;
  height:500px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  border-style:solid;
  border-color:#efefef;
  border-width:1px;
`;

const FeedHeaderText = styled.div`
  width:60px;
  height:35px;
  margin-left:10px;
  font-size:12px;
  display:flex;
  align-items:center;
`

const FeedContentImg = styled.img`
width:100%;
height:400px;
`

const FeedContentText = styled.div`
width:100%;
height:100px;
`

const FeedContentHeader = styled.div`
  padding-left:10px;
  font-size:14px;
  font-weight:bold;
  margin-top:5px;
  margin-bottom:5px;
`

const FeedContentIntro = styled.div`
  padding-left:10px;
  font-size:13px;
`

const UserAssayList = ({ userLoginBtn, changeLoginState }: any) => {
  const [assayData, setAssayData] = useState<any>([]);

  useEffect(() => {
    const start = async () => {
      const data = await getAllAssay();
      setAssayData(data.json.data);
    }
    start();
  },[])


  return (
    <MyPageContainer>
      <Header />
      <FeedContainer>
        <Feed>
          <FeedHeader>
            <FeedHeaderImg src=""/>
            <FeedHeaderText>
              <span>changhyeonh</span>
            </FeedHeaderText>
          </FeedHeader>
          <FeedContent>
            <FeedContentImg/>
            <FeedContentText>
              <FeedContentHeader>
                changhyeonh
              </FeedContentHeader>
              <FeedContentIntro>
                여행지입니다.
              </FeedContentIntro>
            </FeedContentText>
          </FeedContent>
        </Feed>
      </FeedContainer>
      <Footer link={"myPage"} />
    </MyPageContainer>
  );
};

export default UserAssayList;
