import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserLike, getUserSpotLike } from "../../API/Spot/Spot";
import { getUserAssayLike } from "../../API/Assay/Assay";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../API/Common";

const LikeContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items:center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const LikeHeader = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const LikeSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content:center;
  height: 100%;
  min-height:300px;
  padding-top: 30px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const LikeCard = styled.div`
  width: 200px;
  height: 100%;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
`;

const LikeImgDiv = styled.div`
  width: 100%;
  height: 200px;
`;

const LikeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const LikeData = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const SpotHeader = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SpotTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const SpotLike = styled.div`
  font-size: 14px;
`;
const SpotCategory = styled.div`
  font-size: 14px;
  color: silver;
`;
const SpotAddress = styled.div`
  font-size: 14px;
  color: silver;
`;

const LikeCardA = styled.a`
  width: 100%;
  height: 100%;
  color: black;
  text-decoration: none;
`;

const ResultData = styled.div``;

const MyPageLikeAssay = () => {
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [assayData, setAssayData] = useState<any>([]);

  useEffect(() => {
    const start = async () => {
      if (accessToken) {
        const result: any = await getUserLike(accessToken);
        const data: any = await getUserAssayLike(result.json.data, accessToken);
        setAssayData(data.json.result);
      }
    };
    start();
  }, []);

  return (
    <>
      <LikeContainer>
        <LikeHeader>내가 좋아요 누른 여행일지 목록 </LikeHeader>
        <LikeSection>
          {assayData.length === 0 ? (
            <ResultData>누른 좋아요가 없습니다.</ResultData>
          ) : (
            assayData.map((item: any) => {
              return (
                <LikeCard key={item.contentsid}>
                  <LikeCardA href={`/spot/info/${item.contentsid}`}>
                    <LikeImgDiv>
                      <LikeImg src={`${BASE_URL}${item.imgpath}`} />
                    </LikeImgDiv>
                    <LikeData>
                      <SpotHeader>
                        <SpotTitle>{item.title}</SpotTitle>
                        <SpotLike>
                          <span>
                            <FontAwesomeIcon
                              style={{ color: "pink", margin: "0px 3px" }}
                              icon={faHeart}
                            ></FontAwesomeIcon>
                          </span>
                          {item.likeNum}
                        </SpotLike>
                      </SpotHeader>
                      <SpotCategory>{item.contentslabel}</SpotCategory>
                      <SpotAddress>{item.address}</SpotAddress>
                    </LikeData>
                  </LikeCardA>
                </LikeCard>
              );
            })
          )}
        </LikeSection>
      </LikeContainer>
    </>
  );
};

export default MyPageLikeAssay;
