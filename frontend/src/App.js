import React from "react";
import { useReducer } from "react";

const initialState = {count : 0};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, count: state.count+1}
    case "DECREMENT":
      return {...state, count: state.count-1}
    case "ZERO":
      return {...state, count: 0}
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {"value: "}{state.count}
      <br/>
      <button onClick={() => dispatch({type: "INCREMENT"})}>increase</button>
      <button onClick={() => dispatch({type: "DECREMENT"})}>decrease</button>
      <button onClick={() => dispatch({type: "ZERO"})}>zero</button>
    </div>
  )
}
export default App;
