import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotData } from "../../API/Spot/Spot";

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`;

const ResultDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;

const ResultDivImg = styled.div`
  display: flex;
  max-width: 200px;
  width: 100%;
  @media screen and (max-width: 768px) {
   max-width:150px;
  }
`;
const ResultImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius:10px;
  @media screen and (max-width: 768px) {
    width:100px;
    height:100px;
  }
`;
const ResultDivTitle = styled.div`
  width: 70%;
  margin: 0px auto;
`;
const ResultTitle = styled.div`
  width: 100%;
`;

const SearchResult = () => {
  const [spotData, setSpotData] = useState<any>([]);

  useEffect(() => {
    const start = async () => {
      const getData: any = await getSpotData(1);
      setSpotData(getData.json);
    };

    start();
  }, []);

  return (
    <Container>
      {spotData.map((item:any, i:any) => {
        return (
          <ResultDiv key={i}>
            <ResultDivImg>
              <ResultImg src={item.imgpath} />
            </ResultDivImg>
            <ResultDivTitle>
              <ResultTitle>{item.title}</ResultTitle>
            </ResultDivTitle>
          </ResultDiv>
        );
      })}
    </Container>
  );
};

export default SearchResult;
