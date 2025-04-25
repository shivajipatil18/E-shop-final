import { createContext, useState } from "react";
const LangContext=createContext()

export const  LangContextProvider=({children})=>{
    const [lang,setLang]=useState("en")
    const ChangeLang=()=>{
        setLang((lang)=>lang==="en"?"US":"en")  
    }
    return <LangContext.Provider value={{lang,ChangeLang}}>{children}</LangContext.Provider>
}

export default LangContext