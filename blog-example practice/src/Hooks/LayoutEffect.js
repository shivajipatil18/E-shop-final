import React, { useState, useLayoutEffect, useRef } from "react";

const LayoutEffect = () => {
  const [width, setWidth] = useState(0);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: "50%",
          background: "lightblue",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Resize me!
      </div>
      <p>Box Width: {width}px</p>
    </div>
  );
};

export default LayoutEffect;
