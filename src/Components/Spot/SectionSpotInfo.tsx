import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useParams } from "react-router-dom";
import { getSpotInfoData } from "../../API/Spot/Spot";
import { useSelector } from "react-redux";
import { getChangeLikeState, checkSpotLike } from "../../API/Spot/Spot";

const SectionContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SpotInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
`;
const ImgContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SpotImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ContentContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
`;

const SpotContent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;

const NaverMap = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 15px;
  margin-bottom: 200px;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 200px;
    margin-bottom: 100px;
  }
`;

const SpotInfoHeader = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #efefef;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SpotMapHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    width: 90%;
  }
`;

const SpotInfoHeaderContent = styled.div`
  font-size: 25px;
`;

const SpotInfoHeaderContentInfo = styled.div`
  font-size: 20px;
`;

const SpotInfoHeaderContentMap = styled.div`
  font-size: 25px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    font-weigth: bold;
  }
`;

const SpotInfoHeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: silver;
`;

const ImgSpot = styled.div`
  font-size: 20px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    right: 30px;
  }
`;

const ImgIconData = styled.div`
  margin-left: 10px;
  color: white;
  @media screen and (max-width: 768px) {
    margin-left: 3px;
    font-size: 14px;
  }
`;

const ImgIconHeart = styled.div`
  color: pink;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const SpotExplain = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 30px;
  width: 100%;
  font-size: 18px;
`;

const SpotInfomation = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const SpotCategory = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
const SpotCategoryContent = styled.div`
  margin-bottom: 20px;
`;
const SpotTag = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
const SpotTagContent = styled.div`
  color: silver;
  margin-bottom: 20px;
`;

const SpotAddress = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const SpotLike = styled.a``;

const SpotAddressContent = styled.div``;

const SectionSpotInfo = () => {
  const [spotData, setSpotData] = useState<any>({});
  const { id } = useParams();
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [state, setState] = useState(false);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    const getSpotInfoDataFunc = async () => {
      const spotInfoData = await getSpotInfoData(id);
      setSpotData(spotInfoData.json[0]);
      if (accessToken) {
        const result: any = await checkSpotLike(id, accessToken);
        if (result.code === 200) {
          setLikeState(true);
        } else {
          setLikeState(false);
        }
      }
    };
    getSpotInfoDataFunc();
  }, [state]);

  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(spotData.latitude, spotData.longitude),
        zoom: 16,
      });

      let marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(spotData.latitude, spotData.longitude),
      });
    };
    initMap();
  }, [spotData]);

  const likeToggle = async (contentsId: string) => {
    const result: any = await getChangeLikeState(contentsId, accessToken);
    if (result.code === 401) {
      alert("로그인이 필요합니다");
    } else {
      setState(!state);
    }
  };

  return (
    <SectionContainer>
      <SpotInfoContainer>
        <ImgContainer>
          <SpotImg src={spotData.imgpath}></SpotImg>
          <ImgSpot>
            <ImgIconHeart>
              <FontAwesomeIcon icon={faHeart} />
            </ImgIconHeart>
            <ImgIconData>{spotData.likeNum}</ImgIconData>
          </ImgSpot>
        </ImgContainer>
        <ContentContainer>
          <SpotContent>
            <SpotInfoHeader>
              <SpotInfoHeaderContent>{spotData.title}</SpotInfoHeaderContent>
              <SpotInfoHeaderIcon>
                <SpotLike
                  onClick={() => {
                    likeToggle(`${spotData.contentsid}`);
                  }}
                >
                  {likeState ? (
                    <FontAwesomeIcon style={{ color: "pink" }} icon={faHeart} />
                  ) : (
                    <FontAwesomeIcon
                      style={{ color: "silver" }}
                      icon={faHeart}
                    />
                  )}
                </SpotLike>
              </SpotInfoHeaderIcon>
            </SpotInfoHeader>
            <SpotExplain>{spotData.introduction}</SpotExplain>
            <SpotInfoHeader>
              <SpotInfoHeaderContentInfo>정보</SpotInfoHeaderContentInfo>
            </SpotInfoHeader>
            <SpotInfomation>
              <SpotCategory>카테고리</SpotCategory>
              <SpotCategoryContent>
                {spotData.contentslabel}
              </SpotCategoryContent>
              <SpotTag>관련 태그</SpotTag>
              <SpotTagContent>
                {spotData.tag &&
                  spotData.tag.map((item: any) => {
                    return `#${item} `;
                  })}
              </SpotTagContent>
              <SpotAddress>주소</SpotAddress>
              <SpotAddressContent>{spotData.address}</SpotAddressContent>
            </SpotInfomation>
          </SpotContent>
        </ContentContainer>
      </SpotInfoContainer>
      <SpotMapHeader>
        <SpotInfoHeaderContentMap>지도</SpotInfoHeaderContentMap>
      </SpotMapHeader>
      <NaverMap id="map"></NaverMap>
    </SectionContainer>
  );
};

export default SectionSpotInfo;
