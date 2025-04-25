import React, { createContext, useContext, useState } from 'react';


const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// Subcomponents

Toggle.On = function On({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function Off({ children }) {
  const { on } = useContext(ToggleContext);
  return !on ? children : null;
};

Toggle.Button = function Button() {
  const { toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>Toggle</button>;
};

export default Toggle;
