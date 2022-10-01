import React, { useEffect, useState } from "react";
import {
  faHouse,
  faMagnifyingGlass,
  faSuitcase,
  faMapLocationDot,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { link } from "fs";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  height: 60px;
  display: none;
  align-items: center;
  width: 100%;
  border-top-style: solid;
  border-top-color: #efefef;
  border-top-width: 1px;
  -webkit-tap-highlight-color: transparent;
  background-color: white;
  z-index: 20;
  @media screen and (max-width: 768px) {
    display: flex;
    z-index: 20;
  }
`;

const FooterBox = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  z-index: 20;
`;

const FooterIcon = styled.a`
  width: 30px;
  display: flex;
  justify-content: center;
  color: silver;
  font-size: 15px;
  z-index: 20;
`;

const FooterItem = [
  { icon: faHouse, link: "home", go: "/" },
  { icon: faMagnifyingGlass, link: "search", go: "/search" },
  { icon: faSuitcase, link: "spots", go: "/" },
  { icon: faMapLocationDot, link: "map", go: "/" },
  { icon: faUser, link: "myPage", go: "/user/myPage" },
];

const Footer = (link:any) => {
  const [clicked, setClicked] = useState<string>(link.link);

  useEffect(() => {
    const clickIcon = document.getElementById(clicked);
    clickIcon ? (clickIcon.style.color = "black") : null;
    clickIcon ? (clickIcon.style.transitionDuration = "0.5s") : null;

    FooterItem.filter((item) => item.link !== clicked).map((item) => {
      const nonClick = document.getElementById(item.link);
      nonClick ? (nonClick.style.color = "silver") : null;
    });
  }, [clicked]);

  const loadData = (e: any) => {
    setClicked(e.currentTarget.id);
  };

  return (
    <FooterContainer>
      <FooterBox>
        {FooterItem.map((item, i) => {
          return (
            <FooterIcon href={item.go} key={i} id={item.link} onClick={loadData}>
              <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
            </FooterIcon>
          );
        })}
      </FooterBox>
    </FooterContainer>
  );
};

export default Footer;
