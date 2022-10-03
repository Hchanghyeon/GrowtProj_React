import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "../Pages/SearchPage";

const SearchRoute = ({ userLoginBtn, changeLoginState }: any) => {
  return (
    <Routes>
      <Route
        path="/search/*"
        element={
          <SearchPage
            changeLoginState={changeLoginState}
            userLoginBtn={userLoginBtn}
          />
        }
      />
    </Routes>
  );
};

export default SearchRoute;
