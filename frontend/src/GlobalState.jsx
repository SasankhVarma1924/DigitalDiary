import React from "react";
import { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({children}) =>
{
  const [username, setUsername] = useState("");
  const [content, setContent] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <GlobalStateContext.Provider value={{username, setUsername, content, setContent, currentDate, setCurrentDate}}>
      {children}
    </GlobalStateContext.Provider>
  );
}