import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import MyPage from "../Pages/MyPage";
import SearchPage from "../Pages/SearchPage";
import SpotInfoPage from "../Pages/SpotInfoPage";

const MainRoute = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
      <Route
        path='/spot/info/:id'
        element={
          <SpotInfoPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
       <Route
        path="/search/*"
        element={
          <SearchPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
            <Route
        path="/user/myPage/*"
        element={
          <MyPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
    </Routes>
  );
};

export default MainRoute;
