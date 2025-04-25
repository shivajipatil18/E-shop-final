import { createContext, useReducer } from "react";
import { counterReducer, initialState } from "../reducers/counterReducer";

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;
