"use client";

import { ContextData } from "../../context/Context";
import React, { useContext } from "react";

function Reels() {
  const { reels } = useContext(ContextData);
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll h-screen md:max-w-lg md:mx-auto bg-black">
      {reels.map((reel) => {
        const { id, url } = reel;
        return (
          <div key={id} className="h-screen snap-center">
            <video
              src={`https://assets.toastd.in/${url}`}
              loop
              autoPlay
              className="w-full h-screen object-cover"
            ></video>
          </div>
        );
      })}
    </div>
  );
}

export default Reels;
