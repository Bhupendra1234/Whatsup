import React, { createContext, useReducer, useContext } from 'react'
export const  statecontext = createContext();
export const  StateProvider = ({reducer,initialState,children})=> (
 
         <statecontext.Provider value ={useReducer(reducer,initialState)}>
             {children}
        </statecontext.Provider>
);

export const useStateValue =()=>useContext(statecontext);