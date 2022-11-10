import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faMountainSun,
  faUtensils,
  faBook,
  faBed,
} from "@fortawesome/free-solid-svg-icons";

const NavigationContainer = styled.div`
  width: 100%;
  border-top-style: solid;
  border-top-color: #efefef;
  border-top-width: 2px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationBar = styled.div`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

const BarMenu = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 30px;
  cursor: pointer;
  color: #606060;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    padding-bottom: 10px;
    border-bottom-color: silver;
    color: black;
    transition-duration: 0.5s;
  }
  @media screen and (max-width: 768px) {
    margin: 0px 20px;
  }
`;

const BarIcon = styled.div`
  text-algin: center;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 17px;
  }
`;
const BarText = styled.div`
  margin-top: 3px;
  text-align: center;
  font-size: 14px;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const BarItem = [
  { text: "전체", icon: faBorderAll, link: "all" },
  { text: "관광지", icon: faMountainSun, link: "spot" },
  { text: "음식점", icon: faUtensils, link: "food" },
  { text: "스테이", icon: faBed, link: "stay" },
  { text: "여행기록", icon: faBook, link: "assay" },
];

function Navigation({ selectCategory }: any) {
  const [clicked, setClicked] = useState<string>(BarItem[0].link);

  useEffect(() => {
    const clickIcon = document.getElementById(clicked);
    if (clickIcon) {
      clickIcon.style.color = "black";
      clickIcon.style.borderBottomStyle = "solid";
      clickIcon.style.borderBottomWidth = "2px";
      clickIcon.style.paddingBottom = "5px";
      clickIcon.style.transitionDuration = "0.5s";
    }
    BarItem.filter((item) => item.link !== clicked).map((item) => {
      const nonClick = document.getElementById(item.link);
      if (nonClick) {
        nonClick.style.color = "#606060";
        nonClick.style.borderBottomStyle = "none";
        nonClick.style.paddingBottom = "0px";
      }
      return null;
    });
  }, [clicked]);

  const loadData = (e: any) => {
    setClicked(e.currentTarget.id);
    selectCategory(e.currentTarget.id);
  };

  return (
    <NavigationContainer>
      <NavigationBar>
        {BarItem.map((item, i) => {
          return (
            <BarMenu key={i} id={item.link} onClick={loadData}>
              <BarIcon>
                <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
              </BarIcon>
              <BarText>{item.text}</BarText>
            </BarMenu>
          );
        })}
      </NavigationBar>
    </NavigationContainer>
  );
}

export default Navigation;
