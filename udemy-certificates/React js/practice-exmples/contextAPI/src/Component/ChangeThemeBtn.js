import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import LangContext from "../context/LangContext";

const ChangeThemeBtn=()=>{
    const {theme,ChangeTheme, }=useContext(ThemeContext)
    const {ChangeLang}=useContext(LangContext)

    return (
        <>
        <p>Them is   {theme}</p>
        
        <button onClick={ChangeTheme}> Change theme</button>
        <button onClick={ChangeLang}> Change Lang</button>

        </>
    )
}
export default ChangeThemeBtn
