import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getSpotInfoData, addSpotReview } from "../../API/Spot/Spot";
import { useSelector } from "react-redux";
import { getChangeLikeState, checkSpotLike } from "../../API/Spot/Spot";
import { TextField, Button } from "@mui/material";
import { DELETE_USER } from "../../Store/User/User";
import { useDispatch } from "react-redux";
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
import { DistanceKm } from "../../Service/MapUtil";

const SectionContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
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

const ReviewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 100px;
`;

const ReviewImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const ReviewImg = styled.img`
  width: 100px;
  height: 100px;
`;

const ReviewContentBox = styled.div`
  width: 80%;
`;
const ReviewStarBox = styled.div``;

const ReviewComment = styled.div``;

const ReviewAuth = styled.div``;

const SectionSpotInfo = () => {
  const [spotData, setSpotData] = useState<any>({});
  const { id }: any = useParams();
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const userId = useSelector((state: any) => state.user.userId);
  const [state, setState] = useState<boolean>(false);
  const [likeState, setLikeState] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [nowState, setNowState] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>("");
  const [cancel, setCancel] = useState<boolean>(false);
  const [btn, setBtn] = useState<boolean>(false);
  const [locationBtnState, setLocationBtnState] = useState<boolean>(false);
  const [locationBtnText, setLocationBtnText] = useState<string>("위치인증");

  // 리뷰 데이터
  const [review, setReview] = useState<string>("");
  const [locationAuth, setLocationAuth] = useState<boolean>(false);
  const [landmarkAuth, setLandmarkAuth] = useState<boolean>(false);
  const [value, setValue] = useState<number>(3);
  const [reviewState, setReviewState] = useState<boolean>(false);

  // 리뷰 출력 데이터

  // 로그아웃
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(DELETE_USER());
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  useEffect(() => {
    const getSpotInfoDataFunc = async () => {
      const spotInfoData = await getSpotInfoData(id);

      if (spotInfoData.json[0].starNum <= 0) {
        spotInfoData.json[0].starNum = 0;
      } else {
        spotInfoData.json[0].starNum = spotInfoData.json[0].starNum.toFixed(2);
      }

      setSpotData(spotInfoData.json[0]);
      if (accessToken) {
        const result: any = await checkSpotLike(id, accessToken);
        if (result.code === 200) {
          setLikeState(true);
        } else {
          setLikeState(false);
        }
      } else {
      }
    };
    getSpotInfoDataFunc();
  }, [state, reviewState]);

  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(spotData.latitude, spotData.longitude),
        zoom: 16,
      });

      const marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(spotData.latitude, spotData.longitude),
      });
    };
    initMap();
  }, [spotData]);

  // 좋아요 토글
  const likeToggle = async (contentsId: string) => {
    const result: any = await getChangeLikeState(contentsId, accessToken);
    if (result.code === 401) {
      alert("로그인이 필요합니다");
    } else {
      setState(!state);
    }
  };

  // 리뷰 데이터 입력시 가져오기
  const handleReview = (e: any) => {
    setReview(e.target.value);
  };

  // 위치 인증 버튼 클릭시
  const handleLocationAuth = (e: any) => {
    setLocationBtnText("위치인증됨");
    setLocationBtnState(true);
    setLocationAuth(true);
    setModal(false);
  };

  // 지도 모달 취소 버튼 클릭시 닫기
  const handleClose = () => {
    setModal(false);
  };

  // 리뷰 등록 버튼 클릭
  const submitReview = async () => {
    // id 로 sendData 추가
    const sendData = {
      userId,
      review,
      locationAuth,
      landmarkAuth,
      starValue: value,
    };

    const result = await addSpotReview(id, sendData);

    if (result.json.result === "ok") {
      setReview("");
      setLocationBtnText("위치인증");
      setLocationBtnState(false);
      setLocationAuth(false);
      setReviewState(!reviewState);
    }
  };

  const locationCheck = () => {
    setModal(!modal);
    setNowState(true);
    let startPos;
    let geoSuccess = function (position: any) {
      startPos = position;
      const km = DistanceKm(
        spotData.latitude,
        spotData.longitude,
        startPos.coords.latitude,
        startPos.coords.longitude
      );

      setDistance(km);
      setCancel(true);

      let map2: any;
      if (km < 1) {
        setNotice("1KM 이내로 위치인증 가능합니다");
        setBtn(true);
        if (!modal) {
          map2 = new naver.maps.Map("map2", {
            center: new naver.maps.LatLng(
              spotData.latitude,
              spotData.longitude
            ),
            zoom: 14,
          });
        }
      } else {
        setNotice("인증은 1KM 이내만 가능합니다");
        if (!modal) {
          map2 = new naver.maps.Map("map2", {
            center: new naver.maps.LatLng(35.566381, 127.377717),
            zoom: 5,
          });
        }
      }

      const marker = new naver.maps.Marker({
        map: map2,
        position: new naver.maps.LatLng(
          startPos.coords.latitude,
          startPos.coords.longitude
        ),
      });

      const marker2 = new naver.maps.Marker({
        map: map2,
        position: new naver.maps.LatLng(spotData.latitude, spotData.longitude),
      });

      const polyline = new naver.maps.Polyline({
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
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
  };

  return (
    <SectionContainer>
      <SpotInfoContainer>
        <ImgContainer>
          <SpotImg src={spotData.imgpath}></SpotImg>
          <ImgSpot>
            <ImgIconHeart>
              <FontAwesomeIcon
                icon={faStar}
                style={{
                  color: "#faaf00",
                }}
              />
            </ImgIconHeart>
            <ImgIconData>
              {spotData.starNum <= 0 ? 0 : spotData.starNum}
            </ImgIconData>
            <ImgIconHeart>
              <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faHeart} />
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
      {accessToken ? (
        <>
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
              value={review}
            />
            <CommentButtonDiv>
              {locationBtnState ? (
                <Button
                  onClick={locationCheck}
                  variant="contained"
                  color="success"
                  disabled
                >
                  {locationBtnText}
                </Button>
              ) : (
                <Button
                  onClick={locationCheck}
                  variant="contained"
                  color="success"
                >
                  {locationBtnText}
                </Button>
              )}

              <Button
                variant="contained"
                color="success"
                onClick={submitReview}
              >
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
                  {cancel ? (
                    <Button autoFocus onClick={handleClose}>
                      취소
                    </Button>
                  ) : (
                    <></>
                  )}
                  {btn ? (
                    <Button onClick={handleLocationAuth} autoFocus>
                      인증
                    </Button>
                  ) : (
                    <></>
                  )}
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
          </Dialog>{" "}
        </>
      ) : (
        <></>
      )}
      <ReviewContainer>
        <ReviewBox>
          <Rating name="read-only" value={value} readOnly />
        </ReviewBox>
      </ReviewContainer>
    </SectionContainer>
  );
};

export default SectionSpotInfo;
