import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faHeart,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import * as fetchSpot from "../../API/Spot/Spot";


const NaverMap = styled.div`
  height: calc(100vh - 182px);
  width: 100%;
  @media screen and (max-width: 768px) {
    height: calc(100vh - 300px);
  }
  @media screen and (max-width: 468px) {
    height: calc(100vh - 380px);
  }
`;

const DivContainer = styled.a`
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
  text-decoration:none;
  color:black;
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

const Text = styled.div`
  width: 90%;
  height: 70px;
  padding-top: 5px;
  margin: 0px auto;
`;

const Div = styled.div`
  font-weight: bold;
  font-size: 12px;
`;

const Div2 = styled.div`
  font-size: 11px;
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

const Map = (userClickBtn: any) => {
  const [userCurrentLocation, setUserCurrentLocation] =
    useState<boolean>(false);

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

  useEffect(() => {
    const initMap = () => {
      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(33.35, 126.54039),
        zoom: 9,
      });
    };
    initMap();
    let data: any;

    const start: any = async () => {
      data = await fetchSpot.getSpotData(userClickBtn.userClickBtn);
      const result:any = data.json;
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
            mapBtn.href= `/spot/info/${result[i].contentsid}`;
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
  
  }, [userClickBtn]);

  return (
    <>
      <NaverMap id="map"></NaverMap>
      <DivContainer id="clickMapBtn" >
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
        <Text>
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
