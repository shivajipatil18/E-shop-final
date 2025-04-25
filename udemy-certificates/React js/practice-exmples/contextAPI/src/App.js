import "./App.css";


import Container from "./Component/Container";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

function App() {
  const {theme}=useContext(ThemeContext)
  return (
    <div>
        <div className={theme === "white" ? "light-theme" : "dark-theme"}></div>
     <Container/>
    </div>
  );
}

export default App;
