import React, { memo } from 'react';

const ChildComponent = memo(({ onClick,msg  }) => {
  console.log("child component Rendered");

  return (
    <div><p>{msg}</p>
    <button onClick={onClick}>Increment</button>;
    </div>
  );
});

export default ChildComponent;