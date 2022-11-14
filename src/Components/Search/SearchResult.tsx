import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpotSearch, getTagSearch } from "../../API/Spot/Spot";
import { getAssaySearch } from "../../API/Assay/Assay";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BASE_URL } from "../../API/Common";

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
    max-width: 150px;
  }
`;
const ResultImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
const ResultDivTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const ResultTitle = styled.div`
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 5px;
  background-color: #efefef;
  border-style: none;
  border-radius: 3px;
`;

const ResultContainer = styled.div`
  width: 70%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ResultLike = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultHead = styled.div``;
const ResultCategory = styled.div`
  font-size: 14px;
  color: silver;
  margin-top: 4px;
`;
const ResultAddress = styled.div`
  font-size: 14px;
  color: silver;
`;

const ResultTag = styled.div`
  font-size: 12px;
  color: silver;
  margin-top: 5px;
`;

const LikeNum = styled.div`
  margin-left: 5px;
`;

const SelectToggleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SearchResult = () => {
  const [spotData, setSpotData] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [alignment, setAlignment] = useState("spot");

  useEffect(() => {
    const start = async () => {
      const data = {
        searchData: searchText,
      };

      let getData: any;

      if (alignment === "spot") {
        getData = await getSpotSearch(data);
        setSpotData(getData.json);
      } else if (alignment === "assay") {
        getData = await getAssaySearch(data);
        setSpotData(getData.json);
      } else {
        getData = await getTagSearch(data);
        setSpotData(getData.json);
      }
    };
    start();
  }, [searchText, alignment]);

  const getSearchData = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    setSearchText("");
    if (alignment === "tag") {
      setSearchText("제주");
    }
  }, [alignment]);

  return (
    <Container>
      <SelectToggleDiv>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="spot">관광지</ToggleButton>
          <ToggleButton value="assay">여행일지</ToggleButton>
          <ToggleButton value="tag">태그</ToggleButton>
        </ToggleButtonGroup>
      </SelectToggleDiv>
      <Input
        placeholder="검색하고싶은 내용을 입력하세요"
        onChange={getSearchData}
        value={searchText}
      ></Input>
      {alignment === "spot" || alignment === "tag" ? (
        spotData.map((item: any, i: any) => {
          return (
            <ResultDiv key={i}>
              <ResultDivImg>
                <ResultImg src={item.imgpath} />
              </ResultDivImg>
              <ResultContainer>
                <ResultDivTitle>
                  <ResultTitle>
                    <ResultHead>{item.title}</ResultHead>
                    <ResultCategory>{item.contentslabel}</ResultCategory>
                    <ResultAddress>{item.address}</ResultAddress>
                    <ResultTag>
                      {item.tag &&
                        item.tag.map((item: any) => {
                          return `#${item} `;
                        })}
                    </ResultTag>
                  </ResultTitle>
                  <ResultLike>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{
                        color: "#faaf00",
                      }}
                    />
                    <LikeNum>
                      {item.starNum.toFixed(2) <= 0
                        ? 0
                        : item.starNum.toFixed(2)}
                    </LikeNum>
                    <FontAwesomeIcon
                      style={{ marginLeft: "5px", color: "pink" }}
                      icon={faHeart}
                    ></FontAwesomeIcon>
                    <LikeNum>{item.likeNum}</LikeNum>
                  </ResultLike>
                </ResultDivTitle>
              </ResultContainer>
            </ResultDiv>
          );
        })
      ) : (
        <></>
      )}
      {alignment === "assay" ? (
        spotData.map((item: any, i: any) => {
          return (
            <ResultDiv key={i}>
              <ResultDivImg>
                <ResultImg src={`${BASE_URL}${item.imgpath}`} />
              </ResultDivImg>
              <ResultContainer>
                <ResultDivTitle>
                  <ResultTitle>
                    <ResultHead>{item.title}</ResultHead>
                    <ResultAddress style={{ marginTop: "4px" }}>
                      {item.address}
                    </ResultAddress>
                    <ResultTag>
                      {" "}
                      {item.tag &&
                        item.tag.map((item: any) => {
                          return `${item} `;
                        })}
                    </ResultTag>
                  </ResultTitle>
                  <ResultLike>
                    <FontAwesomeIcon
                      style={{ color: "pink" }}
                      icon={faHeart}
                    ></FontAwesomeIcon>
                    <LikeNum>{item.likeNum}</LikeNum>
                  </ResultLike>
                </ResultDivTitle>
              </ResultContainer>
            </ResultDiv>
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SearchResult;
