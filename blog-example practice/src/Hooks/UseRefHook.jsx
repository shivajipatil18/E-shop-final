import React, { useRef, useState } from "react";

const UseRefHook = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); 

  const focusInput = () => {
    inputRef.current.focus();
  };

  const showValue = () => {
    setInputValue(inputRef.current.value); 
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={showValue}>Show Value</button>
      <h2>Entered Value: {inputValue}</h2>
    </div>
  );
};

export default UseRefHook;
