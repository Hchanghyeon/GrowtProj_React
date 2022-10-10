import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUserAssay } from "../../API/Assay/Assay";
const MapContainer = styled.div`
  width: 90%;
  height: 250px;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
  border-bottom-width: 2px;
  @media screen and (max-width: 768px) {
    max-width: 400px;
    height: 200px;
    width: 90%;
  }
`;

const NaverMap = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const MapAssay = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const [userAssay, setUserAssay] = useState<any>([]);

  useEffect(() => {
    const initMap = async () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(35.866381, 126.977717),
        zoom: 4,
      });

      const result: any = await getUserAssay({ userId });
      for (let i = 0; i < result.json.data.length; i++) {
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(
            result.json.data[i].latitude,
            result.json.data[i].longitude
          ),
        });

        console.log(result.json.data[i].latitude);
      }
    };
    initMap();
  }, []);

  useEffect(() => {
    const getUser = async () => {};
    getUser();
  }, []);

  return (
    <MapContainer>
      <NaverMap id="map"></NaverMap>
    </MapContainer>
  );
};

export default MapAssay;
