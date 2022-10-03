import React, { useState } from "react";
import MainRoute from "./Routes/MainRoute";
import SearchRoute from "./Routes/SearchRoute";
import UserRoute from "./Routes/UserRoute";

function App() {
  const [userLoginBtn, setUserLoginBtn] = useState<boolean>(false);

  const changeLoginState = () => {
    setUserLoginBtn(!userLoginBtn);
  };

  return (
    <>
      <MainRoute changeLoginState={changeLoginState} userLoginBtn={userLoginBtn}></MainRoute>
    </>
  );
}

export default App;
