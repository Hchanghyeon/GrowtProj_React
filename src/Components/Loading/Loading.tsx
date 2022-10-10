import React from "react";
import Spinner from "../../Asset/Image/Spinner2.gif";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const LoadingText = styled.div`
  font: 1rem;
  text-align: center;
  font-weight:bold;
`;

const LoadingImg = styled.img`
text-align: center;     
`

const Loading = ({text}:any) => {
  return (
    <Background>
      <LoadingText>{text}</LoadingText>
      <LoadingImg src={Spinner} alt="로딩중" width="70px" />
    </Background>
  );
};

export default Loading;
