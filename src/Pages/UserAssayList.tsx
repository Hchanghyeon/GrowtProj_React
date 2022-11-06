import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAssay } from "../API/Assay/Assay";
import { BASE_URL } from "../API/Common";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MyPageContainer } from "../Styles/theme";
import LoginModal from "../Components/User/LoginModal";


const FeedContainer = styled.div`
  max-width: 400px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;

const Feed = styled.div`
  width: 100%;
  height: 600px;
`;

const FeedHeader = styled.div`
  width: 100%;
  height: 60px;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
  display: flex;
  align-items: center;
  border-bottom-style: none;
`;

const FeedHeaderHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedHeaderImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 15px;
`;

const FeedContent = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
`;

const FeedHeaderText = styled.div`
  width: 60px;
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const FeedContentImg = styled.img`
  width: 100%;
  height: 400px;
`;

const FeedContentText = styled.div`
  width: 100%;
  height: 100px;
`;

const FeedContentHeader = styled.div`
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const FeedContentIntro = styled.div`
  padding-left: 10px;
  font-size: 13px;
`;

const FeedContentHashTag = styled.div`
  padding-left: 10px;
  font-size: 13px;
  color: silver;
`;

const FeedHeaderAdd = styled.div`
  width: 100%;
  padding-left: 10px;
  font-size: 11px;
`;

const AssayList = ({ userLoginBtn, changeLoginState }: any) => {
  const [assayData, setAssayData] = useState<any>([]);


  useEffect(() => {
    const start = async () => {
      const data = await getAllAssay();
      setAssayData(data.json.data);
    };
    start();
  }, []);

  return (
    <MyPageContainer>
      <Header changeLoginState={changeLoginState}/>
      <FeedContainer>
        {assayData.map((item: any, i: any) => {
          return (
            <Feed key={i}>
              <FeedHeader>
                <FeedHeaderImg src={BASE_URL + "/img/infoUserImg/user.png"} />
                <FeedHeaderHeader>
                  <FeedHeaderText>
                    <span>{item.userId}</span>
                  </FeedHeaderText>
                  <FeedHeaderAdd>{item.address}</FeedHeaderAdd>
                </FeedHeaderHeader>
              </FeedHeader>
              <FeedContent>
                <FeedContentImg src={BASE_URL + item.imgpath} />
                <FeedContentText>
                  <FeedContentHeader>{item.title}</FeedContentHeader>
                  <FeedContentIntro>{item.introduction}</FeedContentIntro>
                  <FeedContentHashTag>
                    {item.tag.map((item: any) => {
                      return item + " ";
                    })}
                  </FeedContentHashTag>
                </FeedContentText>
              </FeedContent>
            </Feed>
          );
        })}
      </FeedContainer>
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"spots"} />
    </MyPageContainer>
  );
};

export default AssayList;
