import { createContext, useReducer } from "react";
export const ThemeContext=createContext()
export const TOGGLE = "TOGGLE";
const INITIAL_STATE={darkmode:true}
const themeReducer=(state,action)=>{
switch(action.type){
    case "TOGGLE":
        return{ darkmode:!state.darkmode}
        default:
            return state
}
}

const ThemeProvider=({children})=>{
    const [state,dispatch]=useReducer(themeReducer,INITIAL_STATE)
    return <ThemeContext.Provider value={{state,dispatch}}>{children}</ThemeContext.Provider>
}
export default ThemeProvider 