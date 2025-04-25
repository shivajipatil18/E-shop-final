import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import LangContext from "../context/LangContext";

const Main = () => {
  const { theme, ChangeTheme } = useContext(ThemeContext);
  const { ChangeLang } = useContext(LangContext);
  return (
    <div>
      <hr />
      <h1>Main</h1>
      Theme:{theme}
      <button onClick={ChangeTheme}>Change Theme </button>
      <button onClick={ChangeLang}>Change Lang</button>
    </div>
  );
};

export default Main;
