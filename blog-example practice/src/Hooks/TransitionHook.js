import { useState, useTransition } from 'react';

function TransitionHook() {
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setList(Array(20000).fill('Item'));
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Load Items</button>
      {isPending ? <p>Loading...</p> : list.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}
export default TransitionHook