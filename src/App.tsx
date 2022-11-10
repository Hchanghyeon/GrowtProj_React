import React, { useState } from "react";
import MainRoute from "./Routes/MainRoute";
import "./Styles/app.css";

function App() {
  const [userLoginBtn, setUserLoginBtn] = useState<boolean>(false);

  const changeLoginState = () => {
    setUserLoginBtn(!userLoginBtn);
  };

  return (
    <>
      <MainRoute
        changeLoginState={changeLoginState}
        userLoginBtn={userLoginBtn}
      ></MainRoute>
    </>
  );
}

export default App;
