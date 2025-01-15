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
        const { id, videoUrl } = reel;
        return (
          <div key={id} className="h-screen snap-center bg-[#ffffff]">
            <video
              src={`${videoUrl}?${new Date().getTime()}`}
              loop
              autoPlay
              muted
              className="h-screen object-fit"
            ></video>
          </div>
        );
      })}
    </div>
  );
}

export default Reels;
