
// 
import React, { useState } from "react";

function Batching() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);

    }, 1000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {flag.toString()}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}
export default Batching