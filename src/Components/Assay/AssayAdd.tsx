import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AssayForm = styled.div`
  margin-top: 30px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  text-align:center;
  background-size: 100% 100%;
  line-height:300px;
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
  margin-top:5px;
  margin-right:5px;

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

const AssayAdd = ({clickedAddBtn}:any) => {
  const [files, setFiles] = useState<any>("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [textExplain, setTextExplain] = useState("이미지를 넣어주세요");
  const [tagArr, setTagArr] = useState<String[]>([]);
  const [tag, setTag] = useState("");

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
  },[files]);

  useEffect(():any => {
    
  },[clickedAddBtn])

  const preview = () => {
    if (!files) return false;

    const imgEL: any = document.querySelector(".img_box");
    const reader = new FileReader();

    reader.onload = () => {
        setTextExplain('');
      imgEL.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
  };

  const handleInputTag = (e: any) => {
    if(e.target.value.length >= 10){
        e.target.value = e.target.value.substring(0,9);
        return alert('열글자를 넘기면 안됩니다');
    }else {
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
    if(tagArr.length >= 10){
        return alert("태그는 10개까지만 입력할 수 있습니다");
    }
    setTagArr([...tagArr, tag]);
  };

  return (
    <AssayForm>
      <ImgContainer>
        <Img className="img_box">{textExplain}</Img>
      </ImgContainer>
      <InputFile type="file" id="image" accept="img/*" onChange={onLoadFile} />
      <ImgPlusBtn>
        <label htmlFor="image">
          <FontAwesomeIcon id="plus" icon={faPlusCircle} />
        </label>
      </ImgPlusBtn>
      <InputTitle type="text" placeholder="제목을 입력해주세요"></InputTitle>
      <InputText placeholder="여행 기록을 해주세요"></InputText>
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
    </AssayForm>
  );
};

export default AssayAdd;
