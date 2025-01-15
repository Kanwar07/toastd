"use client";

import React, { createContext, useEffect, useState } from "react";

export const ContextData = createContext();

export function ContextProvider({ children }) {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      //const response = await fetch("https://toastd.in/api/file/tapes");
      const response = await fetch(
        "https://dummyjson.com/c/f9c8-0b3d-4669-9193",
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const reelsdate = await response.json();
      setReels(reelsdate);
    };
    fetchdata();
  }, []);

  return (
    <ContextData.Provider value={{ reels }}>{children}</ContextData.Provider>
  );
}
