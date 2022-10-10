import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUserAssay } from "../../API/Assay/Assay";
import { BASE_URL } from "../../API/Common";

const CenterContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const AssayImg = styled.img`
  width: calc(25% - 2px);
  height: 250px;
  @media screen and (max-width: 1200px) {
    height: 200px;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
  border-style: solid;
  border-color: white;
  border-width: 1px;
`;

const ShowAssay = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const [userAssay, setUserAssay] = useState<any>([]);
  useEffect(() => {
    const getUser = async () => {
      const result = await getUserAssay({ userId });
      setUserAssay(result.json.data);
    };
    getUser();
  }, []);

  return (
    <CenterContainer>
      {userAssay.map((item: any, i: any) => {
        return <AssayImg key={i} src={`${BASE_URL}${item.imgpath}`} />;
      })}
    </CenterContainer>
  );
};

export default ShowAssay;
