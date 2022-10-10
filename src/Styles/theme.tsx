import styled from "styled-components";

export const Container = styled.div`
position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    padding-bottom:200px;
  }
`;
