"use client";

import React, { createContext, useEffect, useState } from "react";

export const ContextData = createContext();

export function ContextProvider({ children }) {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("https://toastd.in/api/file/tapes");
      const reelsdate = await response.json();
      setReels(reelsdate);
    };
    fetchdata();
  }, []);

  return (
    <ContextData.Provider value={{ reels }}>{children}</ContextData.Provider>
  );
}
