import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "../Pages/MyPage";

const UserRoute = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <Routes>
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

export default UserRoute;
