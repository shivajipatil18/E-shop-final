import React, { useMemo, useState } from 'react';

function SquareCalculator() {
  const [number, setNumber] = useState(5);

  const squaredNumber = useMemo(() => {
    console.log("calculating square");
    return number * number;
  }, [number]);

  return (
    <div>
          <h1 style={{color:"green"}}>useMemo Example</h1>
      <h2>Square of {number}: {squaredNumber}</h2>
      <input 
        type="number" 
        value={number} 
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)} 
      />
    </div>
  );
}

export default SquareCalculator;