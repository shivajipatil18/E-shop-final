
import './App.css';
import React from "react";
import Couter from './Components/Counter';
import {CounterProvider} from "./contexts/CounterContext"

function App() {
  return (
    <div className="App">
    <CounterProvider>
   
      <Couter/>
      </CounterProvider>
    </div>
  );
}

export default App;
