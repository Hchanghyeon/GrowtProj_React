import React from "react";
import Spinner from "../../Asset/Image/Spinner2.gif";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const LoadingText = styled.div`
  position:absolute;
  bottom:60px;
  font: 1rem;
  text-align: center;
  font-weight:bold;
`;

const LoadingImg = styled.img`
position:absolute;
bottom:10px;
text-align: center;     
`

const LoadingSpot = ({text}:any) => {
  return (
    <Background>
      <LoadingText>{text}</LoadingText>
      <LoadingImg src={Spinner} alt="로딩중" width="70px" />
    </Background>
  );
};

export default LoadingSpot;
