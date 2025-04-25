import React,{useReducer} from 'react'
import {reducer,intialState} from "./reducer"

const CounterWithUsereducer = () => {
    const[state,dispatch]= useReducer(reducer,intialState)
    console.log(state.count)
    
  return (
    <div>
       <h1>counter:{state.count}</h1> 
        <div style={{ fontSize: "20px", padding: "10px 20px" }} >
        <button onClick={() => dispatch({ type: "INCREMENT" })} style={{ fontSize: "50px", padding: "20px 30px" }} >+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}  style={{ fontSize: "50px", padding: "20px 30px" }}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}  style={{ fontSize: "50px", padding: "20px 30px" }}>Reset</button>
      </div>
    </div>
  )
}

export default CounterWithUsereducer