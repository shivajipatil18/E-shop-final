import { createContext, useEffect } from "react";
import useTheme from "../Hooks/useTheme";

const ThemeContext = createContext();
// const defaultTheme = localStorage.getItem("theme") || "white";

export const ThemeContextProvider = ({ children }) => {
  const {theme,ChangeTheme}=useTheme()
  // const [theme, setTheme] = useState(defaultTheme);

  // const ChangeTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "white" ? "dark" : "white"));
  // };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme === "white" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
