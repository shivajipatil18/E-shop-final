import React, { useCallback, useState } from 'react';
import ChildComponent from './ChildComponent';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
        <h1 style={{color:"green"}}>usecallback Example</h1>
      <h2>Counter: {count}</h2>
      <ChildComponent onClick={increment} />
    </div>
  );
}

export default Counter;