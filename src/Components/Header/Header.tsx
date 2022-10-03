import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DELETE_USER } from "../../Store/User/User";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisVertical,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../API/Common";

const HeaderMain = styled.div`
  height: 80px;
  width: 90%;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  a {
    cursor: pointer;
  }
`;

const ImgLogo = styled.img`
  width: 100px;
  height: 60px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SearchA = styled.a`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  color: #9e9ea7;
`;

const LoginBtn = styled.div`
  width: 30px;
  height: 80px;
  background-color: white;
  color: #606060;
  border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-style: none;
  font-size: 18px;
  margin-right: 10px;
  color: #606060;
  cursor: pointer;
`;

const MenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-style: none;
  font-size: 25px;
  color: #606060;
  position: relative;
  cursor: pointer;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const MenuUl = styled.ul`
  visibility: hidden;
  position: absolute;
  top: 10px;
  right: 10px;
  list-style: none;
  border-style: none;
  width: 220px;
  border-radius: 5px;
  padding: 10px 0px;
  animation: fadeInUp 1s;
  z-index: 1;
  box-shadow: 0px 0px 5px 0px silver;
  background-color: white;

  a {
    text-decoration:none;
    color: #606060;
  }
`;
const MenuLi = styled.li`
  font-size: 15px;
  width: 100%;
  text-align: left;
  height: 20px;
  z-index: 1;
  padding: 10px 20px;
`;

const UserLoginImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserLoginImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
`;

function Header({ changeLoginState }: any) {
  const userLoginState = useSelector((state: any) => state.user.authenticated);
  const userLoginImg = useSelector((state: any) => state.user.imgSrc);
  const dispatch = useDispatch();

  const openMenu = () => {
    const menu: any = document.querySelector("ul");

    if (menu.style.visibility === "hidden" || menu.style.visibility === "") {
      menu.style.visibility = "visible";
    } else {
      menu.style.visibility = "hidden";
    }
  };

  const logout = () => {
    dispatch(DELETE_USER());
  };

  return (
    <HeaderMain>
      <a href="/">
        <ImgLogo src="/img/GrowT_Logo.png"></ImgLogo>
      </a>
      <HeaderRight>
        <SearchA>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </SearchA>
        {userLoginState ? (
          <UserLoginImgContainer>
            <UserLoginImg src={`${BASE_URL}${userLoginImg}`} />
          </UserLoginImgContainer>
        ) : (
          <LoginBtn>
            <UserLoginBtn onClick={changeLoginState}>
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </UserLoginBtn>
          </LoginBtn>
        )}
        <MenuBtn onClick={openMenu}>
          <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          {userLoginState ? (
            <MenuUl>
              <a onClick={logout}>
                <MenuLi>로그아웃</MenuLi>
              </a>
              <MenuLi>내정보</MenuLi>
              <hr />
              <a href="/"><MenuLi>홈</MenuLi></a>
              <MenuLi>여행일지</MenuLi>
              <MenuLi>나의 여행일지</MenuLi>
            </MenuUl>
          ) : (
            <MenuUl>
              <MenuLi>
                <a onClick={changeLoginState}>로그인</a>
              </MenuLi>
              <MenuLi>회원가입</MenuLi>
              <hr />
              <a href="/"><MenuLi>홈</MenuLi></a>
              <MenuLi>여행일지</MenuLi>
              <MenuLi>도움말</MenuLi>
            </MenuUl>
          )}
        </MenuBtn>
      </HeaderRight>
    </HeaderMain>
  );
}

export default Header;
