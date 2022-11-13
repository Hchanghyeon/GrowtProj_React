import React from "react";
import styled from "styled-components";

const CharacterContainer = styled.div`
  width: 90%;
  height: 100%;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Header = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  height: 60px;
`;

const CharacterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Level = styled.div`
  width: 20%;
`;

const Character = () => {
  const ImageArr: any = {
    img: ["level1", "level2", "level3", "level4", "level5"],
    level: ["1~5Lv", "6~10Lv", "11~15Lv", "16~20Lv", "21~30Lv"],
  };

  const CharacterArr = [
    { img: "level1", level: ["1~5Lv"] },
    { img: "level2", level: ["6~10Lv"] },
    { img: "level3", level: ["11~15Lv"] },
    { img: "level4", level: ["16~20Lv"] },
    { img: "level5", level: ["21~30Lv"] },
  ];

  return (
    <CharacterContainer>
      <Header>캐릭터 정보</Header>
      {CharacterArr.map((item: any, i: any) => {
        return (
          <CharacterBox key={i}>
            <Level>{item.level}</Level>
            <Image src={`/img/${item.img}.png`} />
          </CharacterBox>
        );
      })}
    </CharacterContainer>
  );
};

export default Character;
