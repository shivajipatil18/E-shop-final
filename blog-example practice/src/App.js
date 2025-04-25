import React, { Suspense, lazy } from 'react';
import Counter from './optimization/Counter';
import SquareCalculator from './optimization/SquareCalculator';
import SearchComponent from './optimization/SearchComponent';
import UseStateExample from './Hooks/UseStateExample';
import UseEffectExample from './Hooks/UseEffectExample';
// import Counter from './optimization/Counter';
import CounterWithUsereducer from "./Hooks/usereducer/CounterWithUsereducer"
import UseRefHook from './Hooks/UseRefHook';
import LayoutEffect from './Hooks/LayoutEffect';
import TransitionHook from './Hooks/TransitionHook';
import Batching from './components/Batching';
import Toggle from './components/Compound';


const LazyComponent = lazy(() => import('./optimization/LazyComponent'));

function App() {
  return (
    <div>
          <div style={{ padding: '1rem' }}>
      <h2>Simple Compound Component Example</h2>
      <Toggle>
        <Toggle.On>✅ The toggle is ON</Toggle.On>
        <Toggle.Off>❌ The toggle is OFF</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    </div>

      <Suspense fallback={<div>Loading</div>}>
        {/* <LazyComponent /> */}
      </Suspense>
      {/* <Counter /> */}
      {/* <SquareCalculator /> */}
      <br/>
      {/* <SearchComponent/>
      <UseStateExample/> */}

      {/* <CounterWithUsereducer/> */}
      {/* <UseEffectExample/> */}
      {/* <UseRefHook/> */}
      {/* <TransitionHook/> */}
      {/* <LayoutEffect/> */}
      <Batching/>
    </div>
  );
}

export default App;
