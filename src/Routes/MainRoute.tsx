import React from "react";
import { Route, Routes } from "react-router-dom";
import AssayList from "../Pages/AssayList";
import MainPage from "../Pages/MainPage";
import MyAssay from "../Pages/MyAssay";
import MyPage from "../Pages/MyPage";
import SearchPage from "../Pages/SearchPage";
import SpotInfoPage from "../Pages/SpotInfoPage";
import CharacterPage from "../Pages/CharacterPage";

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
        path="/spot/info/:id"
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
      <Route
        path="/user/myAssay/*"
        element={
          <MyAssay
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
      <Route
        path="/user/character/*"
        element={
          <CharacterPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
      <Route
        path="/assay/assayList/*"
        element={
          <AssayList
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
    </Routes>
  );
};

export default MainRoute;
