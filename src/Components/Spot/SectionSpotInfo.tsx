import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLandmark,
  faLocationDot,
  faStar,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getSpotInfoData, addSpotReview } from "../../API/Spot/Spot";
import { useSelector } from "react-redux";
import { getChangeLikeState, checkSpotLike } from "../../API/Spot/Spot";
import { getUserExpData } from "../../API/User/User";
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
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { DistanceKm } from "../../Service/MapUtil";
import { BASE_URL } from "../../API/Common";
import axios from "axios";

const ImgContainer2 = styled.div`
  position: relative;
  width: 280px;
  height: 250px;
  margin: 0px auto;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: silver;
  border-width: 1px;
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-size: 100% 100%;
  line-height: 250px;
  font-size: 14px;
`;

const ImgContainer3 = styled.div`
  position: relative;
  width: 280px;
  height: 250px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img2 = styled.div`
  width: 280px;
  height: 250px;
  text-align: center;
  background-size: 100% 100%;
  line-height: 300px;
`;

const ImgSrc = styled.img`
  width: 280px;
  height: 250px;
  margin-bottom: 10px;
`;

const ImgPlusBtn = styled.button`
  border-style: none;
  background-color: white;

  #plus {
    font-size: 24px;
    color: #83b551;
  }
`;

const SectionContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
`;

const ContainerExplain = styled.div`
  width: 280px;
  margin: 0px auto;
  text-align: center;
  font-size: 13px;
`;

const ImagePercent = styled.div`
  width: 280px;
  margin: 0 auto;
  font-size: 13px;
  color: black;
  margin-bottom: 5px;
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
  width: 280px;
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

const InputFile = styled.input`
  visibility: hidden;
`;

const ImgIconData = styled.div`
  margin-left: 10px;
  padding-right: 10px;
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

const TestBtn = styled.button``;

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
  padding-top: 20px;
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #efefef;
  padding: 20px 0px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0px auto;
  }
`;

const ReviewImgBox = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
`;

const ReviewImg = styled.img`
  width: 100px;
  height: 100px;
  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ReviewContentBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const ReviewStarBox = styled.div`
  font-size: 13px;
`;

const ReviewComment = styled.div`
  font-size: 13px;
  padding-left: 5px;
`;

const ReviewAuth = styled.div`
  font-size: 13px;
  margin-top: 10px;
  padding-left: 5px;
  display: flex;
  color: silver;
`;

const ReviewId = styled.div`
  font-size: 14px;
  padding-left: 5px;
  margin-bottom: 10px;
`;

const SpotTextHeader = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: black;
  width: 280px;
`;

const SpotTextContent = styled.div`
  font-size: 12px;
  font-weight: bold;
  width: 280px;
`;

const SpotTextNotice = styled.div`
  width: 280px;
  font-size: 12px;
  font-weight: bold;
`;

const TextHeaderContianer = styled.div`
  width: 280px;
  margin: 0px auto;
  margin-bottom: 5px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const AddImageDiv = styled.div`
  width: 280px;
  margin: 0px auto;
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ImageBtnDiv = styled.div`
  width: 280px;
  margin: 0px auto;
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  justify-content: end;
`;

const CompleteExplain = styled.div`
  width: 100%;
  font-size: 10px;
  color: silver;
`;

const LandmarkText = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  font-weight: bold;
  color: black;
`;

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
  const userLoginImg = useSelector((state: any) => state.user.imgSrc);

  // 리뷰 데이터
  const [review, setReview] = useState<string>("");
  const [locationAuth, setLocationAuth] = useState<boolean>(false);
  const [landmarkAuth, setLandmarkAuth] = useState<boolean>(false);
  const [value, setValue] = useState<number>(3);
  const [reviewState, setReviewState] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(true);

  // 인공지능 인식
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [textExplain, setTextExplain] = useState("이미지를 넣어주세요");
  const [files, setFiles] = useState<any>("");
  const [imageBtn, setImageBtn] = useState("이미지 인증");
  const [loading, setLoading] = useState<boolean>(false);
  const [authCom, setAuthCom] = useState<boolean>(false);
  const [authBtn, setAuthBtn] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [completeExplain, setCompleteExplain] = useState<string>("");
  const [imageBtnState, setImageBtnState] = useState<boolean>(false);
  const [imageBtnText, setImageBtnText] = useState<string>("랜드마크인증");
  const [landmarkText, setLandmarkText] = useState<string>("");
  const [landmarkValue, setLandmarkValue] = useState<number>(0);
  const [landmarkBoolean, setLandmarkBoolean] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  // 로그아웃
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(DELETE_USER());
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  useEffect((): any => {
    preview();
  }, [files]);

  const toggleBtn = () => {
    setLoading(false);
    setAuthCom(true);
    const result = 80;

    if (result > 70) {
      setComplete(true);
    } else {
      setComplete(false);
      setCompleteExplain("유사도가 70%를 넘지 못하여 인증 할 수 없습니다");
    }
  };

  const preview = () => {
    if (!files) return false;
    const imgEL: any = document.querySelector(".img_box");
    const reader = new FileReader();
    reader.onload = () => {
      setTextExplain("");
      imgEL.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
  };

  const onLoadFile = (e: any) => {
    setAuthBtn(true);
    const file = e.target.files;
    if (file && file[0]["type"].split("/")[0] === "image") {
      setFiles(file);
    } else {
      alert("파일이 이미지가 아닙니다. 다시 선택해주세요");
    }
  };

  const submitData = async () => {
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("contentsid", id);

    let test: any;
    let result: any;
    let error: boolean = false;
    try {
      test = await fetch(`https://whitegreen.synology.me:8282/predict`, {
        method: "post",
        body: formData,
      });
      result = await test.json();
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert(err);
    }

    if (!error) {
      setLoading(false);
      setAuthCom(true);
      if (result.randmark === "False") {
        setComplete(false);
        setLandmarkText(result.class_name);
        setLandmarkValue(result.rate);
        const spotImgData: any = await getSpotInfoData(result.contentid);
        console.log(spotImgData);
        setImageSrc(spotImgData.json[0].imgpath);
        setLandmarkBoolean(false);
        setCompleteExplain(
          `선택하신 관광지인 ${
            spotData.title
          }은 지정된 랜드마크가 아니지만 업로드 해주신 사진은 그루트 랜드마크 중 ${
            result.class_name
          }하고 ${(result.rate * 100).toFixed(0)}% 정도 유사합니다`
        );
      } else {
        setLandmarkBoolean(true);
        setLandmarkText(result.class_name);
        setLandmarkValue(result.rate);
        if (result.rate > 70) {
          setComplete(true);
        } else {
          setComplete(false);
          setCompleteExplain("유사도가 70%를 넘지 못하여 인증 할 수 없습니다");
        }
      }
    }
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
      if (spotInfoData.json[0].review.length !== 0) {
        for (let i = 0; i < spotInfoData.json[0].review.length; i++) {
          if (spotInfoData.json[0].review[i].userId === userId) {
            setLoginState(false);
          }
        }
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

  const handleImageAuth = () => {
    setImageModal(false);
    setImageBtnText("랜드마크인증됨");
    setImageBtnState(true);
    setLandmarkAuth(true);
  };

  // 지도 모달 취소 버튼 클릭시 닫기
  const handleClose = () => {
    setModal(false);
  };

  // 지도 모달 취소 버튼 클릭시 닫기
  const handleImgModalClose = () => {
    setImageModal(false);
    setFiles("");
    setTextExplain(`${spotData.title} 이미지를 넣어주세요`);
    setImageBtn("이미지 인증");
    setLoading(false);
    setAuthCom(false);
    setAuthBtn(false);
    setComplete(false);
    setCompleteExplain("");
  };

  // 리뷰 등록 버튼 클릭
  const submitReview = async () => {
    // id 로 sendData 추가
    const sendData = {
      userImg: userLoginImg,
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
      setFiles("");
      setTextExplain("이미지를 넣어주세요");
      setImageBtn("이미지 인증");
      setLoading(false);
      setAuthCom(false);
      setAuthBtn(false);
      setComplete(false);
      setCompleteExplain("");
      setImageBtn("랜드마크인증");
      setImageBtnState(false);
    }
  };

  const authPicture = () => {
    setLoading(true);
    setImageBtn("유사도 측정중");
    submitData();
  };

  const imageCheck = () => {
    setImageModal(!imageModal);
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
            <ImgIconHeart key={5}>
              {spotData.landmark ? (
                <FontAwesomeIcon
                  icon={faLandmark}
                  style={{
                    color: "#faaf00",
                    marginRight: "10px",
                  }}
                />
              ) : (
                <></>
              )}
            </ImgIconHeart>
            <ImgIconHeart key={2}>
              <FontAwesomeIcon
                icon={faStar}
                style={{
                  color: "#faaf00",
                }}
              />
            </ImgIconHeart>
            <ImgIconData key={1}>
              {spotData.starNum <= 0 ? 0 : spotData.starNum}
            </ImgIconData>
            <ImgIconHeart key={3}>
              <FontAwesomeIcon icon={faHeart} />
            </ImgIconHeart>
            <ImgIconData key={4}>{spotData.likeNum}</ImgIconData>
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
      <>
        <CommentContainer>
          <Box style={{ display: "flex", paddingBottom: "20px" }}>
            <Typography style={{ fontSize: "16px" }} component="legend">
              <span>평점</span>
            </Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event: any, newValue: any) => {
                setValue(newValue);
              }}
            />
          </Box>

          {accessToken ? (
            loginState ? (
              <TextField
                style={{ width: "100%", marginBottom: "10px" }}
                fullWidth
                label="리뷰"
                id="fullWidth"
                onChange={handleReview}
                value={review}
              />
            ) : (
              <TextField
                style={{ width: "100%", marginBottom: "10px" }}
                fullWidth
                label="이미 리뷰를 입력한 관광지입니다"
                id="fullWidth"
                onChange={handleReview}
                value={review}
                disabled
              />
            )
          ) : (
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              fullWidth
              label="로그인시 입력 가능합니다"
              id="fullWidth"
              onChange={handleReview}
              value={review}
              disabled
            />
          )}

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
                <span>{locationBtnText}</span>
              </Button>
            )}

            {imageBtnState ? (
              <Button
                style={{ marginLeft: "5px" }}
                onClick={imageCheck}
                variant="contained"
                color="success"
                disabled
              >
                <span>{imageBtnText}</span>
              </Button>
            ) : (
              <Button
                style={{ marginLeft: "5px" }}
                onClick={imageCheck}
                variant="contained"
                color="success"
              >
                <span>{imageBtnText}</span>
              </Button>
            )}

            {accessToken ? (
              loginState ? (
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="contained"
                  color="success"
                  onClick={submitReview}
                >
                  <span>등록</span>
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="contained"
                  color="success"
                  onClick={submitReview}
                  disabled
                >
                  <span>등록</span>
                </Button>
              )
            ) : (
              <Button
                style={{ marginLeft: "5px" }}
                variant="contained"
                color="success"
                onClick={submitReview}
                disabled
              >
                <span>등록</span>
              </Button>
            )}
          </CommentButtonDiv>
        </CommentContainer>
        <Dialog open={modal}>
          <DialogTitle id="responsive-dialog-title">
            <span>관광지 인증</span>
          </DialogTitle>
          {nowState ? (
            <>
              <DialogContent
                style={{
                  width: "300px",
                  height: "380px",
                  padding: "0px 10px",
                  margin: "0px auto",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <NaverMap2 id="map2" />
                <DialogContentText>
                  <SpotTextHeader>관광지와 현재 나와의 거리</SpotTextHeader>
                  <SpotTextContent>{distance.toFixed(2)}Km</SpotTextContent>
                  <hr></hr>
                </DialogContentText>
                <DialogContentText>
                  <SpotTextNotice>{notice}</SpotTextNotice>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {cancel ? (
                  <Button autoFocus onClick={handleClose}>
                    <div>취소</div>
                  </Button>
                ) : (
                  <></>
                )}
                {btn ? (
                  <Button onClick={handleLocationAuth} autoFocus>
                    <div>인증</div>
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
      <Dialog open={imageModal} style={{ width: "100%" }}>
        <DialogTitle id="responsive-dialog-title">
          <span>랜드마크 인증</span>
        </DialogTitle>
        <DialogContent
          style={{
            width: "300px",
            height: "480px",
            padding: "0px 10px",
            margin: "0px auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <DialogContentText style={{ width: "280px" }}>
            {loading || authCom ? (
              landmarkBoolean ? (
                <ImgContainer3>
                  <ImgSrc src={spotData.imgpath}></ImgSrc>
                </ImgContainer3>
              ) : loading ? (
                <>
                  <ImgContainer2>
                    <Img className="img_box">{textExplain}</Img>
                  </ImgContainer2>
                  <InputFile type="file" id="image" onChange={onLoadFile} />
                </>
              ) : (
                <ImgContainer3>
                  <ImgSrc src={imageSrc}></ImgSrc>
                </ImgContainer3>
              )
            ) : (
              <>
                <ImgContainer2>
                  <Img className="img_box">{textExplain}</Img>
                </ImgContainer2>
                <InputFile type="file" id="image" onChange={onLoadFile} />
                <AddImageDiv>
                  <ImgPlusBtn>
                    <label htmlFor="image" style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon
                        style={{ marginRight: "10px", fontSize: "20px" }}
                        id="plus"
                        icon={faPlusCircle}
                      />
                      이미지 추가
                    </label>
                  </ImgPlusBtn>
                </AddImageDiv>
              </>
            )}

            {loading ? (
              <>
                {" "}
                <ContainerExplain>
                  사진에 따라 몇 분 소요될 수 있습니다
                </ContainerExplain>
                <hr></hr>{" "}
              </>
            ) : (
              <></>
            )}
            {authCom ? (
              landmarkBoolean ? (
                <>
                  <LandmarkText>
                    <div>
                      <span style={{ color: "black", fontSize: "14px" }}>
                        비교 랜드마크
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                      <span
                        style={{
                          color: "orange",
                          marginRight: "7px",
                          fontSize: "12px",
                        }}
                      >
                        <FontAwesomeIcon icon={faLandmark} />
                      </span>
                      {landmarkText}
                    </div>
                  </LandmarkText>
                  <ImagePercent>
                    <div>
                      <span style={{ color: "black", fontSize: "14px" }}>
                        랜드마크 유사도
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                      {(landmarkValue * 100).toFixed(2)}%
                    </div>
                  </ImagePercent>
                  <CompleteExplain>{completeExplain}</CompleteExplain>
                </>
              ) : (
                <>
                  <div>
                    <span style={{ color: "black", fontSize: "14px" }}>
                      유사한 랜드마크
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                    <span
                      style={{
                        color: "orange",
                        marginRight: "7px",
                        fontSize: "12px",
                      }}
                    >
                      <FontAwesomeIcon icon={faLandmark} />
                    </span>
                    {landmarkText}
                  </div>
                  <ImagePercent>
                    <div>
                      <span style={{ color: "black", fontSize: "14px" }}>
                        랜드마크 유사도
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                      {(landmarkValue * 100).toFixed(2)}%
                    </div>
                  </ImagePercent>
                  <CompleteExplain>{completeExplain}</CompleteExplain>
                </>
              )
            ) : (
              <></>
            )}

            {authCom || !authBtn ? (
              <></>
            ) : (
              <ImageBtnDiv>
                <LoadingButton
                  size="small"
                  onClick={authPicture}
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                >
                  <span>{imageBtn}</span>
                </LoadingButton>
              </ImageBtnDiv>
            )}
          </DialogContentText>
          <DialogActions style={{ width: "100%" }}>
            <Button size="small" autoFocus onClick={handleImgModalClose}>
              <div>취소</div>
            </Button>
            {complete ? (
              <Button size="small" onClick={handleImageAuth} autoFocus>
                <div>인증</div>
              </Button>
            ) : (
              <></>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
      <ReviewContainer>
        {spotData.review &&
          spotData.review.map((item: any, i: any) => {
            return (
              <ReviewBox key={i}>
                <ReviewImgBox>
                  <ReviewImg src={`${BASE_URL}${item.userImg}`} />
                </ReviewImgBox>
                <ReviewContentBox>
                  <ReviewId>{item.userId}</ReviewId>
                  <ReviewStarBox>
                    <Rating name="read-only" value={item.starValue} readOnly />
                  </ReviewStarBox>
                  <ReviewComment>{item.review}</ReviewComment>
                  <ReviewAuth>
                    {item.locationAuth ? (
                      <div
                        style={{ color: "yellowgreen", marginRight: "10px" }}
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: "3px" }}
                          icon={faLocationDot}
                        ></FontAwesomeIcon>
                        위치인증
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.landmarkAuth ? (
                      <div style={{ color: "orange" }}>
                        <FontAwesomeIcon
                          style={{ marginRight: "3px" }}
                          icon={faLandmark}
                        ></FontAwesomeIcon>
                        랜드마크 인증
                      </div>
                    ) : (
                      <></>
                    )}
                  </ReviewAuth>
                </ReviewContentBox>
              </ReviewBox>
            );
          })}
      </ReviewContainer>
    </SectionContainer>
  );
};

export default SectionSpotInfo;
