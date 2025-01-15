"use client";

import React, { createContext, useEffect, useState } from "react";

export const ContextData = createContext();

export function ContextProvider({ children }) {
  const [reels, setReels] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchreels = async () => {
      //"https://dummyjson.com/c/65b7-f6c3-44e4-982c
      //const response = await fetch("https://toastd.in/api/file/tapes");
      const response = await fetch("https://toastd.in/api/file/tapes", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const reelsdate = await response.json();
      setReels(reelsdate);
    };
    fetchreels();
  }, []);

  useEffect(() => {
    const fetchcategory = async () => {
      const response = await fetch("https://toastd.in/api/category");
      const categoryData = await response.json();
      setCategories(categoryData);
    };
    fetchcategory();
  });

  return (
    <ContextData.Provider value={{ reels, categories }}>
      {children}
    </ContextData.Provider>
  );
}
