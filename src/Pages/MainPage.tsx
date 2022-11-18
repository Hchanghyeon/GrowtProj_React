import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Navigation from "../Components/Navigation/Navigation";
import { Container } from "../Styles/theme";
import Footer from "../Components/Footer/Footer";
import Section from "../Components/Main/SectionSpot";
import Map from "../Components/Main/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faMap } from "@fortawesome/free-solid-svg-icons";
import SectionSpot from "../Components/Main/SectionSpot";
import SectionAssay from "../Components/Main/SectionAssay";
import LoginModal from "../Components/User/LoginModal";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MapBtn = styled.button`
  position: fixed;
  bottom: 75px;
  width: 100px;
  background-color: #222222;
  border-radius: 20px;
  border-style: none;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  z-index: 30px;
`;

const MapRef = styled.div`
  margin-right: 5px;
`;

function MainPage({ userLoginBtn, changeLoginState }: any) {
  const [clickMapBtn, setClickMapBtn] = useState<boolean>(false);
  const [userClickBtn, setUserClickBtn] = useState<string>("");
  const [assayClickBtn, setAssayClickBtn] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const changeState = () => {
    setClickMapBtn(!clickMapBtn);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectCategory = (value: any) => {
    let requestValue: string;
    if (value === "all") {
      requestValue = "";
      setAssayClickBtn(false);
      setOpen(false);
    } else if (value === "spot") {
      requestValue = "c1";
      setAssayClickBtn(false);
      setOpen(false);
    } else if (value === "food") {
      requestValue = "c4";
      setAssayClickBtn(false);
      setOpen(false);
    } else if (value === "stay") {
      requestValue = "c3";
      setAssayClickBtn(false);
      setOpen(false);
    } else if (value === "assay") {
      requestValue = "assay";
      setAssayClickBtn(true);
      setOpen(false);
    } else if (value === "landmark") {
      requestValue = "landmark";
      setOpen(true);
      setAssayClickBtn(false);
    } else {
      requestValue = "";
      setAssayClickBtn(false);
      setOpen(false);
    }
    setUserClickBtn(requestValue);
  };

  return (
    <Container>
      <Header changeLoginState={changeLoginState} />
      <Navigation selectCategory={selectCategory}></Navigation>
      {clickMapBtn ? (
        <Map userClickBtn={userClickBtn} />
      ) : assayClickBtn ? (
        <SectionAssay userClickBtn={userClickBtn}></SectionAssay>
      ) : (
        <SectionSpot userClickBtn={userClickBtn} />
      )}
      <MapBtn onClick={changeState}>
        {clickMapBtn ? <MapRef>목록 보기</MapRef> : <MapRef>지도</MapRef>}
        <FontAwesomeIcon icon={faMap} />
      </MapBtn>
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <span>
            GrowT의 랜드마크란?
            <FontAwesomeIcon
              icon={faLandmark}
              style={{ marginLeft: "10px", color: "orange" }}
            />
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span>
              GrowT에서 지정한 랜드마크로 랜드마크는 리뷰에서 인공지능 기반의
              이미지 인식 인증이 가능합니다
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span>확인</span>
          </Button>
        </DialogActions>
      </Dialog>
      <Footer link={"home"}></Footer>
    </Container>
  );
}

export default MainPage;
