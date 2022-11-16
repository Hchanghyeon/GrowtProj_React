import React from "react";
import styled from "styled-components";

const CharacterContainer = styled.div`
  width: 90%;
  height: 100%;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
  @media screen and (max-width: 1268px) {
    width: 75px;
    height: 75px;
  }
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
  @media screen and (max-width: 1268px) {
    font-size: 13px;
  }
`;

const Level = styled.div`
  width: 20%;
`;

const Character = () => {
  const ImageArr: any = {
    img: ["level1", "level2", "level3", "level4", "level5"],
    level: ["1~10Lv", "11~20Lv", "21~30Lv", "31~40Lv", "41~50Lv"],
  };

  const CharacterArr = [
    { img: "level1", level: ["Lv. 1~10"] },
    { img: "level2", level: ["Lv. 11~20"] },
    { img: "level3", level: ["Lv. 21~30"] },
    { img: "level4", level: ["Lv. 31~40"] },
    { img: "level5", level: ["Lv. 41~50"] },
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
