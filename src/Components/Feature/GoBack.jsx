import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Div = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const GoBack = () => {
  return (
    <Div>
      <FontAwesomeIcon
        style={{
          position: "absolute",
          left: "30px",
          top: "30px",
          cursor: "pointer",
          fontSize: "18px",
        }}
        onClick={() => window.history.go(-1)}
        icon={faArrowLeft}
      ></FontAwesomeIcon>
    </Div>
  );
};

export default GoBack;
