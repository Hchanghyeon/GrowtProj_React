import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const UserInfoContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 100px;
  bottom: 0px;
  right: 0px;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  @media screen and (max-width: 768px) {
    height: 50px;
  }
`;

const UserCountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:right;
  width:100%;
`;
const UserCountDiv = styled.div`
  margin-left: 5px;
  margin-right: 10px;
`;

const UserCountMap = styled.div`
margin-top:5px;
width:100%;
text-align:right;
`;


const HeaderAssayUserInfo = ({assayLikeCount, assayCount}:any) => {
  return (
    <UserInfoContainer>
      <UserCountContainer>
        <FontAwesomeIcon style={{ color: "pink" }} icon={faHeart} />
        <UserCountDiv>{assayLikeCount}</UserCountDiv>
        <FontAwesomeIcon style={{ color: "cobaltblue" }} icon={faThumbsUp} />
        <UserCountDiv>0</UserCountDiv>
      </UserCountContainer>
      <UserCountMap>
        여행완료 <b>{assayCount}</b>곳
      </UserCountMap>
    </UserInfoContainer>
  );
};

export default HeaderAssayUserInfo;
