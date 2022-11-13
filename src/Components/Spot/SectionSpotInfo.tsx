import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getSpotInfoData } from "../../API/Spot/Spot";
import { useSelector } from "react-redux";
import { getChangeLikeState, checkSpotLike } from "../../API/Spot/Spot";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";

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
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;

const NaverMap = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 200px;
    margin-bottom: 100px;
  }
`;

const NaverMap2 = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 300px;
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

const CommentHeader = styled.div`
  padding-left: 20px;
  width: 100%;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    width: 90%;
    font-size: 22px;
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 200px;
  @media screen and (max-width: 768px) {
    width: 90%;
    font-size: 22px;
  }
`;

const CommentInput = styled.div``;

const CommentButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const SectionSpotInfo = () => {
  const [spotData, setSpotData] = useState<any>({});
  const { id } = useParams();
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [state, setState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [value, setValue] = useState(3);
  const [review, setReview] = useState("");
  const [modal, setModal] = useState(false);
  const [distance, setDistance] = useState(0);
  const [nowState, setNowState] = useState(false);
  const [notice, setNotice] = useState("");
  const handleClose = () => {
    setModal(false);
  };

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

  const handleReview = (e: any) => {
    setReview(e.target.value);
  };

  function getDistanceFromLatLonInKm(
    lat1: any,
    lng1: any,
    lat2: any,
    lng2: any
  ) {
    function deg2rad(deg: any) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  const locationCheck = () => {
    setModal(!modal);
    setNowState(true);
    let startPos;
    let geoSuccess = function (position: any) {
      startPos = position;
      const spotCoord = {
        lat: spotData.latitude,
        lng: spotData.longitude,
      };

      const userCoord = {
        lat: startPos.coords.latitude,
        lng: startPos.coords.longitude,
      };
      const km = getDistanceFromLatLonInKm(
        spotCoord.lat,
        spotCoord.lng,
        userCoord.lat,
        userCoord.lng
      );

      setDistance(km);

      if (km < 1) {
        setNotice("1KM 이내로 인증 가능합니다");
      } else {
        setNotice("1KM 초과로 인증 불가능합니다");
      }

      if (!modal) {
        const map2 = new naver.maps.Map("map2", {
          center: new naver.maps.LatLng(35.566381, 127.377717),
          zoom: 5,
        });

        let marker = new naver.maps.Marker({
          map: map2,
          position: new naver.maps.LatLng(
            startPos.coords.latitude,
            startPos.coords.longitude
          ),
        });

        let marker2 = new naver.maps.Marker({
          map: map2,
          position: new naver.maps.LatLng(
            spotData.latitude,
            spotData.longitude
          ),
        });

        let polyline = new naver.maps.Polyline({
          map: map2,
          path: [
            new naver.maps.LatLng(
              startPos.coords.latitude,
              startPos.coords.longitude
            ),
            new naver.maps.LatLng(spotData.latitude, spotData.longitude),
          ],
          strokeColor: "orange",
          strokeOpacity: 0.6,
          strokeWeight: 3,
        });
      }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
  };

  useEffect(() => {}, [nowState]);

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
      <CommentHeader>리뷰</CommentHeader>
      <CommentContainer>
        <Box style={{ display: "flex", paddingBottom: "20px" }}>
          <Typography style={{ fontSize: "16px" }} component="legend">
            평점
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event: any, newValue: any) => {
              setValue(newValue);
            }}
          />
        </Box>
        <TextField
          style={{ width: "100%", marginBottom: "10px" }}
          fullWidth
          label="리뷰"
          id="fullWidth"
          onChange={handleReview}
        />
        <CommentButtonDiv>
          <Button onClick={locationCheck} variant="contained" color="success">
            위치인증
          </Button>
          <Button variant="contained" color="success">
            등록
          </Button>
        </CommentButtonDiv>
      </CommentContainer>
      <Dialog open={modal}>
        <DialogTitle id="responsive-dialog-title">관광지 인증</DialogTitle>
        {nowState ? (
          <>
            <DialogContent style={{ width: "300px", height: "350px" }}>
              <NaverMap2 id="map2" />
              <DialogContentText>
                관광지와 현재 나와의 거리 : {distance.toFixed(2)}Km
              </DialogContentText>
              <DialogContentText>{notice}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                취소
              </Button>
              <Button onClick={handleClose} autoFocus>
                인증
              </Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent
            style={{
              width: "300px",
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
          </DialogContent>
        )}
      </Dialog>
    </SectionContainer>
  );
};

export default SectionSpotInfo;
