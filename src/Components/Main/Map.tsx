import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faHeart,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import * as fetchSpot from "../../API/Spot/Spot";

const NaverMap = styled.div`
  position: relative;
  display: flex;
  height: calc(100vh - 182px);
  width: 100%;
  @media screen and (max-width: 768px) {
    height: calc(100vh - 320px);
  }
  @media screen and (max-width: 468px) {
    height: calc(100vh - 320px);
  }
`;

const DivContainer = styled.div`
  position: absolute;
  visibility: hidden;
  z-index: 30;
  background-color: white;
  width: 300px;
  height: 300px;
  bottom: 150px;
  opacity: 0;
  border-radius: 20px;
  transition-duration: 0.5s;
  text-decoration: none;
  color: black;
  @media screen and (max-width: 768px) {
    bottom: 50px;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 300px;
  height: 230px;
`;

const Img = styled.img`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 100%;
`;

const XBtn = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  border-style: none;
  border-radius: 20px;
  background-color: black;
  opacity: 0.6;
`;

const ImgOn = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
`;

const Text = styled.a`
  width: 90%;
  height: 70px;
  padding-top: 5px;
  margin: 0px auto;
  text-decoration:none;
  color:black;
`;

const Div = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding-left:5px;
`;

const Div2 = styled.div`
  font-size: 11px;
  padding-left:5px;
`;

const Span = styled.div`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const LocationBtn = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: white;
  right: 30px;
  bottom: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  border-color: silver;
  color: silver;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    right: 10px;
    bottom: 80px;
  }
`;

const MapHeader = styled.div`
display:flex;
justify-content:center;
align-items:center;
  position: absolute;
  width: 300px;
  height: 50px;
  margin: 0 auto;
  top: 200px;
  border-style: none;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  border-radius: 2px;
  z-index: 100;
`;

const MoreBtn = styled.button`
  width: 100px;
  height: 50px;
  background-color: white;
  border-style: none;
  border-right-style: solid;
  border-right-color: silver;
  border-right-width: 1px;
  cursor: pointer;
  z-index: 100;
`;

const MoreDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
  width:190px;
  height:50px;
  font-size:14px;
  font-weight:bold;
`

const MoreImg = styled.img`
  width:20px; 
  height:20px;
  margin-left:5px;
`

const Map = (userClickBtn: any) => {
  const [userCurrentLocation, setUserCurrentLocation] =
    useState<boolean>(false);
  const refNum: any = useRef(0);
  const forestNum: any = useRef(0);
  const homeNum: any = useRef(0);
  const foodNum: any =useRef(0);
  const spotData: any = useRef([]);
  const assayNum: any =useRef(0);

  let map: any = null;
  let marker: any;

  const currentLocation = () => {
    let startPos;
    let geoSuccess = function (position: any) {
      startPos = position;
      map.setCenter(
        new naver.maps.LatLng(
          startPos.coords.latitude,
          startPos.coords.longitude
        )
      );
      map.setZoom(13, true);
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(
          startPos.coords.latitude,
          startPos.coords.longitude
        ),
        icon: {
          content:
            '<img src="/img/placeholder.png" style="width:32px; height:32px;"/>',
          size: new naver.maps.Size(32, 32),
          anchor: new naver.maps.Point(16, 32),
          // origin: new naver.maps.Point(0, 0),
          // anchor: new naver.maps.Point(25, 26)
        },
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };

  function closeModal() {
    const mapBtn: any = document.getElementById("clickMapBtn");
    mapBtn.style.visibility = "hidden";
    mapBtn.style.opacity = 0;
  }

  function go() {
    const initMap = () => {
      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(33.35, 126.54039),
        zoom: 9,
      });
    };
    initMap();
    const start: any = async () => {
      let data: any;
      if(spotData.current.length > 180){
         alert('200개 이상 요청시 버벅거림으로 초기화 후 검색되지 않았던 다른 리스트를 출력합니다');
         spotData.current = [];
      }
      if (userClickBtn.userClickBtn === "") {
        data = await fetchSpot.getSpotData(refNum.current);
        spotData.current = [...spotData.current, ...data.json];
        forestNum.current = 0;
        homeNum.current =0;
        foodNum.current =0;
        spotData.current.map((item:any) => {
          if(item.contentsvalue === 'c1'){
            forestNum.current = forestNum.current + 1;
          } else if(item.contentsvalue ==='c3'){
            homeNum.current = homeNum.current + 1;
          } else if(item.contentsvalue ==='c4'){
            foodNum.current = foodNum.current + 1;
          }
        })
      } else {
        data = await fetchSpot.getCategorySpotData(
          userClickBtn.userClickBtn,
          refNum.current
        );
        if(data.json.length === 0){
          alert('요청한 데이터가 전부입니다. 처음데이터로 돌아갑니다');
          refNum.current = 0;
          spotData.current = [];
          go();
        }
        spotData.current = [...spotData.current, ...data.json];
        forestNum.current = 0;
        homeNum.current =0;
        foodNum.current =0;
        assayNum.current=0;
        spotData.current.map((item:any) => {
          if(item.contentsvalue === 'c1'){
            forestNum.current = forestNum.current + 1;
          } else if(item.contentsvalue ==='c3'){
            homeNum.current = homeNum.current + 1;
          } else if(item.contentsvalue ==='c4'){
            foodNum.current = foodNum.current + 1;
          } else {
            assayNum.current = assayNum.current + 1;
          }
        })
      }

      const food: any = document.getElementById("food2");
      const home: any = document.getElementById("home");
      const forest: any = document.getElementById("forest");
      const assay: any = document.getElementById("assay2");

      food.innerHTML = foodNum.current;
      home.innerHTML = homeNum.current;
      forest.innerHTML = forestNum.current;
      assay.innerHTML = assayNum.current;


      const result: any = spotData.current;
      for (let i = 0; i < result.length; i++) {
        let longitude = result[i].longitude;
        let latitude = result[i].latitude;
        let contentsValue = result[i].contentsvalue;

        //관광지
        if (contentsValue === "c1") {
          marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
            icon: {
              content:
                '<img src="/img/forest.png" style="width:32px; height:32px;"/>',
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 32),
            },
          });
          // 숙박
        } else if (contentsValue === "c3") {
          marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
            icon: {
              content:
                '<img src="/img/home.png" style="width:32px; height:32px;"/>',
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 32),
            },
          });
          // 음식점
        } else if (contentsValue === "c4") {
          marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
            icon: {
              content:
                '<img src="/img/fast-food.png" style="width:32px; height:32px;"/>',
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 32),
              // origin: new naver.maps.Point(0, 0),
              // anchor: new naver.maps.Point(25, 26)
            },
          });
        } else {
          map.setCenter(new naver.maps.LatLng(36.966381, 126.977717));
          map.setZoom(7, true);
          marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(latitude, longitude),
            icon: {
              content:
                '<img src="/img/travel.png" style="width:32px; height:32px;"/>',
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 32),
              // origin: new naver.maps.Point(0, 0),
              // anchor: new naver.maps.Point(25, 26)
            },
          });
        }

        if (userClickBtn.userClickBtn === "assay") {
          const imgsrc: any = document.getElementById("srcimg");
          const mapBtn: any = document.getElementById("clickMapBtn");
          const spotTitle: any = document.getElementById("spotTitle");
          const spotIntro: any = document.getElementById("spotIntro");
          const alink:any = document.getElementById("alink");
          const like: any = document.getElementById("like");
          mapBtn.style.visibility = "hidden";
          mapBtn.style.opacity = 0;
          naver.maps.Event.addListener(marker, "click", function (e) {
            map.setCenter(
              new naver.maps.LatLng(result[i].latitude, result[i].longitude)
            );
            map.setZoom(13, true);
            imgsrc.src = `http://growingtrip.com:3001${result[i].imgpath}`;
            spotTitle.innerHTML = result[i].title;
            spotIntro.innerHTML = result[i].introduction;
            like.innerHTML = result[i].likeNum;
            mapBtn.style.visibility = "visible";
            mapBtn.style.opacity = 1;
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(naver.maps.Animation.BOUNCE);
            }
          });
        } else {
          const imgsrc: any = document.getElementById("srcimg");
          const mapBtn: any = document.getElementById("clickMapBtn");
          const spotTitle: any = document.getElementById("spotTitle");
          const spotIntro: any = document.getElementById("spotIntro");
          const alink:any = document.getElementById("alink");
          const like: any = document.getElementById("like");
          mapBtn.style.visibility = "hidden";
          mapBtn.style.opacity = 0;
          naver.maps.Event.addListener(marker, "click", function (e) {
            map.setCenter(
              new naver.maps.LatLng(result[i].latitude, result[i].longitude)
            );
            map.setZoom(13, true);
            imgsrc.src = result[i].thumbnailpath;
            spotTitle.innerHTML = result[i].title;
            spotIntro.innerHTML = result[i].address;
            like.innerHTML = result[i].likeNum;
            alink.href = `/spot/info/${result[i].contentsid}`;
            mapBtn.style.visibility = "visible";
            mapBtn.style.opacity = 1;
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(naver.maps.Animation.BOUNCE);
            }
          });
        }
      }
    };
    start();
  }

  useEffect(() => {
    spotData.current = [];
    refNum.current = 0;
    forestNum.current = 0;
    homeNum.current =0;
    foodNum.current =0;
    assayNum.current =0;
    go();
  }, [userClickBtn]);

  function moreData() {
    refNum.current = refNum.current + 1;
    go();
  }

  return (
    <>
      <NaverMap id="map"></NaverMap>
      <MapHeader>
        <MoreBtn onClick={moreData}>더보기</MoreBtn>
      <MoreDiv><MoreImg src="/img/forest.png"/><span id="forest"></span> <MoreImg src="/img/fast-food.png"/><span id="food2"></span><MoreImg src="/img/home.png"/><span id="home"></span><MoreImg src="/img/travel.png"/><span id="assay2"></span></MoreDiv> 
      </MapHeader>
      <DivContainer id="clickMapBtn">
        <ImgContainer>
          <Img id="srcimg" src="" />
          <XBtn onClick={closeModal}>
            <FontAwesomeIcon
              icon={faX}
              style={{ color: "white" }}
            ></FontAwesomeIcon>
          </XBtn>
          <ImgOn>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "pink", marginRight: "3px" }}
            ></FontAwesomeIcon>
            <Span id="like"></Span>
          </ImgOn>
        </ImgContainer>
        <Text id="alink">
          <Div id="spotTitle"></Div>
          <Div2 id="spotIntro"></Div2>
        </Text>
      </DivContainer>
      <LocationBtn onClick={currentLocation}>
        <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
      </LocationBtn>
    </>
  );
};

export default Map;
