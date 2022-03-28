import reducer from "../reducers/reducer";
import { initialState } from "../reducers/reducer";
import { createContext, useReducer } from "react";

export const queryContext = createContext();

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        state,
        changePage: (page) => {
            dispatch({ type: "PAGE", data: page });
        },
        changeLimit: (limit) => {
            dispatch({ type: "LIMIT", data: limit });
        },
        changeAcceptance: (acceptance) => {
            dispatch({ type: "ACCEPTANCE", data: acceptance });
        },
        changeTags: (tags) => {
            dispatch({ type: "TAGS", data: tags });
        },
        changeDifficulty: (difficulty) => {
            dispatch({ type: "DIFFICULTY", data: difficulty });
        },
        changePaid: (difficulty) => {
            dispatch({ type: "PAID", data: difficulty });
        },
        clearAll: () => {
            dispatch({ type: "CLEAR"});
        },
    };
  
    return (
        <queryContext.Provider value={value}>
            {children}
        </queryContext.Provider>
    );
};

export default Provider;