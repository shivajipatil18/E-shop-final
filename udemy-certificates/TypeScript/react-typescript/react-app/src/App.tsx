import React, { JSX } from "react";
import Grider from "./Grider";
import ShoppingList from './ShoppingList'
import "./App.css";

function App():JSX.Element  {
  return (
    <div >
      <Grider />
      <ShoppingList/>
    </div>
  );
}

export default App;
