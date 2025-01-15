"use client";

import { ContextData } from "@/context/Context";
import Link from "next/link";
import React, { useContext } from "react";

function HomePage() {
  const { categories } = useContext(ContextData);
  return (
    <div>
      HomePage
      <Link href="/reels">Reel</Link>
      <div>
        {categories.map((category) => {
          const { id, name } = category;
          return <div key={id}>{name}</div>;
        })}
      </div>
    </div>
  );
}

export default HomePage;
