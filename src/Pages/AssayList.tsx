import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAssay } from "../API/Assay/Assay";
import { BASE_URL } from "../API/Common";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MyPageContainer } from "../Styles/theme";
import LoginModal from "../Components/User/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getChangeLikeState, getUserLike } from "../API/Spot/Spot";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const FeedContainer = styled.div`
  max-width: 400px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;

const Feed = styled.div`
  width: 100%;
  height: 600px;
`;

const FeedHeader = styled.div`
  width: 100%;
  height: 60px;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
  display: flex;
  align-items: center;
  border-bottom-style: none;
`;

const FeedHeaderHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedHeaderImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 15px;
`;

const FeedContent = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-style: solid;
  border-color: silver;
  border-width: 1px;
`;

const FeedHeaderText = styled.div`
  width: 60px;
  margin-left: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const FeedContentImg = styled.img`
  width: 100%;
  height: 400px;
`;

const FeedContentText = styled.div`
  width: 100%;
  height: 100px;
`;

const FeedContentHeader = styled.div`
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const FeedContentIntro = styled.div`
  padding-left: 10px;
  font-size: 13px;
`;

const FeedContentHashTag = styled.div`
  padding-left: 10px;
  font-size: 13px;
  color: silver;
`;

const FeedHeaderAdd = styled.div`
  width: 100%;
  padding-left: 10px;
  font-size: 11px;
`;

const FeedContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedHeaderLike = styled.div`
  padding-right: 10px;
  .heartIcon {
    color: silver;
  }
  .heartIcon2 {
    color: pink;
  }
`;

const AssayList = ({ userLoginBtn, changeLoginState }: any) => {
  const [assayData, setAssayData] = useState<any>([]);
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [openText, setOpenText] = useState(false);
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const start = async () => {
      const data = await getAllAssay();
      if (accessToken) {
        const result: any = await getUserLike(accessToken);

        for (let i = 0; i < result.json.data.length; i++) {
          for (let j = 0; j < data.json.data.length; j++) {
            if (result.json.data[i].contentsid == data.json.data[j]._id) {
              data.json.data[j].likeStatus = true;
            }
          }
        }
      }
      setAssayData(data.json.data);
    };
    start();
  }, [state]);

  const changeLikeState: any = async (contentsId: any) => {
    const result: any = await getChangeLikeState(contentsId, accessToken);
    if (result.code === 401) {
      alert("로그인이 필요합니다");
    } else {
      if (result.json.result === 1) {
        setOpen(true);
        setOpenText(false);
      } else {
        setOpen(true);
        setOpenText(true);
      }
      setState(!state);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <MyPageContainer>
      <Header changeLoginState={changeLoginState} />
      <FeedContainer>
        {assayData.map((item: any, i: any) => {
          return (
            <Feed key={i}>
              <FeedHeader>
                <FeedHeaderImg src={BASE_URL + "/img/infoUserImg/user.png"} />
                <FeedHeaderHeader>
                  <FeedHeaderText>
                    <span>{item.userId}</span>
                  </FeedHeaderText>
                  <FeedHeaderAdd>{item.address}</FeedHeaderAdd>
                </FeedHeaderHeader>
              </FeedHeader>
              <FeedContent>
                <FeedContentImg src={BASE_URL + item.imgpath} />
                <FeedContentText>
                  <FeedContainerHeader>
                    <FeedContentHeader>{item.title}</FeedContentHeader>
                    <FeedHeaderLike>
                      {item.likeStatus ? (
                        <a
                          onClick={() =>
                            changeLikeState(`${item._id.toString()}`)
                          }
                        >
                          <FontAwesomeIcon
                            className="heartIcon2"
                            icon={faHeart}
                          />
                        </a>
                      ) : (
                        <a
                          onClick={() =>
                            changeLikeState(`${item._id.toString()}`)
                          }
                        >
                          <FontAwesomeIcon
                            className="heartIcon"
                            icon={faHeart}
                          />
                        </a>
                      )}
                    </FeedHeaderLike>
                  </FeedContainerHeader>
                  <FeedContentIntro>{item.introduction}</FeedContentIntro>
                  <FeedContentHashTag>
                    {item.tag.map((item: any) => {
                      return item + " ";
                    })}
                  </FeedContentHashTag>
                </FeedContentText>
              </FeedContent>
            </Feed>
          );
        })}
      </FeedContainer>
      {openText ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert severity="warning">
            좋아요를 누른 상대방의 경험치가 -1 되었습니다
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            좋아요를 누른 상대방의 경험치가 +1 되었습니다
          </Alert>
        </Snackbar>
      )}

      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      <Footer link={"spots"} />
    </MyPageContainer>
  );
};

export default AssayList;
