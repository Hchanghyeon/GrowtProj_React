import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import MyPage from "../Pages/MyPage";
import SearchPage from '../Pages/SearchPage';

const MainRoute = () => {
    return (
      <Routes>
        <Route path="/user/myPage/*" element={<MyPage/>} />
        <Route path="/search/*" element={<SearchPage/>} />
        <Route path="/" element={<MainPage/>} />
      </Routes>
    );
};

export default MainRoute;