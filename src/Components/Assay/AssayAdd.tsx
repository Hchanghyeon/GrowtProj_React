import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DaumPostcode from "react-daum-postcode";
import { postAssay } from "../../API/Assay/Assay";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../API/Common";

const AssayForm = styled.div`
  margin-top: 30px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 200px;

  .post {
    max-width: 400px;
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  height: 300px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: silver;
  border-width: 1px;
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-size: 100% 100%;
  line-height: 300px;
`;

const ImgPlusBtn = styled.button`
  border-style: none;
  background-color: white;

  #plus {
    font-size: 24px;
    color: #83b551;
  }
`;

const InputTitle = styled.input`
  margin-top: 10px;
  max-width: 380px;
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  border-style: none;
  border-bottom-style: solid;
  border-bottom-color: silver;
  border-bottom-width: 1px;
`;

const InputText = styled.textarea`
  margin-top: 10px;
  max-width: 380px;
  width: 100%;
  height: 250px;
  border-color: silver;
  padding: 10px;
`;

const InputFile = styled.input`
  visibility: hidden;
`;

const TagHeader = styled.div`
  max-width: 400px;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
`;

const TagArray = styled.div`
  padding-top: 10px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TagArrayData = styled.div`
  padding-top: 10px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TagAddInput = styled.input`
  width: 60px;
  height: 35px;
  border-radius: 30px;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
  padding: 0px 10px;
`;

const TagData = styled.div`
  height: 35px;
  border-radius: 30px;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;

  span {
    font-size: 13px;
  }
`;

const TagAddBtn = styled.button`
  border-style: none;
  background-color: white;
  #tagPlus {
    font-size: 20px;
    color: black;
  }
`;

const Input = styled.input`
  max-width: 380px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 5px 0px;
  padding: 0px;
  padding-left: 10px;
  border-color: silver;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const InputHeader = styled.div`
  max-width: 380px;
  width: 100%;
  margin-top: 10px;
`;

const InputButton = styled.button`
  max-width: 400px;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: #83b551;
  border-style: none;
  color: white;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
  cursor: pointer;
`;

const CheckButton = styled.button`
  max-width: 400px;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: white;
  border-style: solid;
  border-color: #83b551;
  border-width: 1px;
  color: #83b551;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
  cursor: pointer;
`;

const AssayAdd = ({ clickedAddBtn }: any) => {
  const [files, setFiles] = useState<any>("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const userId = useSelector((state: any) => state.user.userId);
  const [textExplain, setTextExplain] = useState("이미지를 넣어주세요");
  const [tagArr, setTagArr] = useState<String[]>([]);
  const [tag, setTag] = useState("");
  const [userAddr1, setUserAddr1] = useState("");
  const [userAddr2, setUserAddr2] = useState("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [addPostcode, setAddPostcode] = useState<boolean>(false);

  const onLoadFile = (e: any) => {
    const file = e.target.files;
    if (file && file[0]["type"].split("/")[0] === "image") {
      setFiles(file);
    } else {
      alert("파일이 이미지가 아닙니다. 다시 선택해주세요");
    }
  };

  useEffect((): any => {
    preview();
  }, [files]);

  useEffect((): any => {}, [clickedAddBtn]);

  const preview = () => {
    if (!files) return false;
    const imgEL: any = document.querySelector(".img_box");
    const reader = new FileReader();
    reader.onload = () => {
      setTextExplain("");
      imgEL.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
  };

  const handleInputTag = (e: any) => {
    if (e.target.value.length >= 10) {
      e.target.value = e.target.value.substring(0, 9);
      return alert("열글자를 넘기면 안됩니다");
    } else {
      setTag(`#${e.target.value}`);
    }
  };

  const clickTagBtn = () => {
    if (tag === "") {
      return alert("입력해주세요");
    }
    for (let i = 0; i < tagArr.length; i++) {
      if (tagArr[i] === tag) {
        return alert("이미 입력된 해쉬태그입니다");
      }
    }
    if (tagArr.length >= 10) {
      return alert("태그는 10개까지만 입력할 수 있습니다");
    }
    setTagArr([...tagArr, tag]);
  };

  const onChangeUserAddr1 = (e: any) => {
    setUserAddr1(e.target.value);
  };

  const onChangeUserAddr2 = (e: any) => {
    setUserAddr2(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleText = (e: any) => {
    setIntroduction(e.target.value);
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
      setAddPostcode(false);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setUserAddr1(data.address);
      setAddPostcode(true);
      setOpenPostcode(false);
    },
  };

  const submitData = async () => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("address", userAddr1);
    formData.append("tag", JSON.stringify(tagArr));
    formData.append("introduction", introduction);

    let test: any;
    let result: any;
    let error:boolean = false;
    try {
      test = await axios.post(`${BASE_URL}/assay/post`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      result = test.response;
    } catch (err) {
      error = true;
      alert(
        "위경도 변환에 사용될 수 없는 주소입니다. 가까운 다른 주소를 입력해주세요"
      );
    }

    if (!error) {
        alert("파일 저장에 성공했습니다.");
        location.href = "/user/myAssay";
    }
  };

  return (
    <AssayForm>
      <ImgContainer>
        <Img className="img_box">{textExplain}</Img>
      </ImgContainer>
      <InputFile type="file" id="image" onChange={onLoadFile} />
      <ImgPlusBtn>
        <label htmlFor="image">
          <FontAwesomeIcon id="plus" icon={faPlusCircle} />
        </label>
      </ImgPlusBtn>
      <InputTitle
        onChange={handleTitle}
        type="text"
        placeholder="제목을 입력해주세요"
      ></InputTitle>
      <InputText
        onChange={handleText}
        placeholder="여행 기록을 해주세요"
      ></InputText>
      <TagHeader>해쉬태그</TagHeader>
      <TagArray>
        <TagAddInput onChange={handleInputTag} />
        <TagAddBtn onClick={clickTagBtn}>
          <FontAwesomeIcon id="tagPlus" icon={faPlusCircle} />
        </TagAddBtn>
      </TagArray>
      <TagArrayData>
        {tagArr.map((item, i) => {
          return (
            <TagData key={i}>
              <span>{item}</span>
            </TagData>
          );
        })}
      </TagArrayData>
      <InputHeader>주소</InputHeader>
      {addPostcode ? (
        <>
          <Input type="text" value={userAddr1} disabled />
          <Input
            type="text"
            placeholder="상세 주소를 입력하세요"
            onChange={onChangeUserAddr2}
          />
        </>
      ) : null}
      {openPostcode && (
        <DaumPostcode
          className="post"
          onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="동양미래대학교" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      )}
      <InputButton onClick={handle.clickButton}>주소 찾기</InputButton>
      {userAddr2 !== "" ? (
        <CheckButton onClick={submitData}>확인</CheckButton>
      ) : null}
    </AssayForm>
  );
};

export default AssayAdd;
