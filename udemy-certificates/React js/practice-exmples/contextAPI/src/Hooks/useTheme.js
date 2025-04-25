import { useState } from "react";

const useTheme = () => {
  const defaultTheme = localStorage.getItem("theme") || "white";
  const [theme, setTheme] = useState(defaultTheme);

  const ChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "white" ? "dark" : "white"));
  };
  return { theme, ChangeTheme };
};

export default useTheme;
