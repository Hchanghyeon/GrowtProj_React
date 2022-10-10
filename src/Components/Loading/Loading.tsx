import React from "react";
import Spinner from "../../Asset/Image/Spinner2.gif";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  width: 100vw;
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
`;

const Loading = ({text}:any) => {
  return (
    <Background>
      <LoadingText>{text}</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
};

export default Loading;
