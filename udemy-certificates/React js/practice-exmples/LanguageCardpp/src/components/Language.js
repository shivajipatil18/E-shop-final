import React, { useState } from "react";

const Language = ({ name, img, options }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="cardwrapper" onClick={() => setShow(!show)}>
    {show &&(
      <div className="cardbottom">
        
        <img src={img} alt="lang" />
        <h3>{name}</h3>
      </div>
      )}
      {!show && (
      <ul>
        {options.map((item)=>(
            <li>{item}</li>
        ))}
      </ul>
      )}
    </div>
  );
};
export default Language;
