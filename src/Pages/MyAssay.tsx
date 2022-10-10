import React, { useEffect, useState } from "react";
import { MyPageContainer } from "../Styles/theme";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import LoginModal from "../Components/User/LoginModal";
import Loading from "../Components/Loading/Loading";
import ShowAssay from "../Components/Assay/ShowAssay";
import MapAssay from "../Components/Assay/MapAssay";
import HeaderAssay from "../Components/Assay/HeaderAssay";


const MyAssay = ({ userLoginBtn, changeLoginState }: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <MyPageContainer>
      <Header changeLoginState={changeLoginState} userLoginBtn={userLoginBtn} />
      <HeaderAssay changeLoginState={changeLoginState} userLoginBtn={userLoginBtn}/>
      <MapAssay/>
      <ShowAssay/>
      <Footer link={"myPage"} />
      <LoginModal
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></LoginModal>
      {loading ? <Loading text="로그아웃중입니다"/> : null}
    </MyPageContainer>
  );
};

export default MyAssay;
