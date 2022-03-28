import React from "react";
import { useReducer, useEffect, useState, useContext } from "react";
import apiClient from "./requests/client";
import { useQuery } from "react-query";
import { queryContext } from "./contexts/context";

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
  const result = useContext(queryContext);
  console.log(result);
  const { isLoading, refetch } = useQuery(
    "leetcode",
    async () => {
      return await apiClient.get("/questions?page=23");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };
        console.log(result);
      },
      onError: (err) => {
        const error = err.response?.data || err;
        console.log(error);
      },
    }
  );
  const tagQuery = useQuery('tags', 
    async () => {
      return await apiClient.get("/tags");
    }, {
      onSuccess: (res) => {
        console.log(res);
      }
    })
  useEffect(() => {
    if (isLoading) {
      console.log("Loading");
    }
  }, [isLoading]);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {"value: "}{state.count}
      <br/>
      <button onClick={() => dispatch({type: "INCREMENT"})}>increase</button>
      <button onClick={() => dispatch({type: "DECREMENT"})}>decrease</button>
      <button onClick={() => dispatch({type: "ZERO"})}>zero</button>
      <button onClick={() => refetch()}>testing</button>
    </div>
  )
}
export default App;
