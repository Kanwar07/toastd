"use client";

import { useEffect, useState, useContext } from "react";
import { ContextData } from "../../context/Context";

function Reels() {
  const { reels } = useContext(ContextData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reels.length > 0) {
      setIsLoading(false);
    }
  }, [reels]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar scroll-smooth md:max-w-lg md:mx-auto bg-black">
      {reels.map((reel) => {
        const { id, url } = reel;
        return (
          <div key={id} className="h-screen snap-center">
            <video
              src={`https://assets.toastd.in/${url}?${new Date().getTime()}`}
              loop
              autoPlay
              muted
              className="w-full h-screen object-cover"
            ></video>
          </div>
        );
      })}
    </div>
  );
}

export default Reels;
