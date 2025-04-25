import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ChangeThemeBtn from "../Component/ChangeThemeBtn";

import Main from "../Component/Main";

import Footer from "../Component/Footer";


const Container = () => {
    const { theme } = useContext(ThemeContext);
  return (
    <div className={`container ${theme}`}>
      <ChangeThemeBtn />
      <Main />
      <Footer />
    </div>
  );
};

export default Container;
