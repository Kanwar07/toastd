"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ContextData } from "../../context/Context";
import mute from "../assets/mute.svg";
import unmute from "../assets/unmute.svg";
import Link from "next/link";
import home from "../assets/home.png";
import Image from "next/image";
import like from "../assets/like.json";
import Lottie from "react-lottie";

function Reels() {
  const { reels } = useContext(ContextData);
  const videoRefs = useRef({});
  const buttonRefs = useRef({});
  const likedRef = useRef({});

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = videoRefs.current[entry.target.id];
        if (video) {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    }, options);

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, []);

  const toggleSound = (id) => {
    if (videoRefs.current[id]) {
      const video = videoRefs.current[id];
      video.muted = !video.muted;

      if (buttonRefs.current[id]) {
        buttonRefs.current[id].textContent = video.muted ? "Unmute" : "Mute";
      }
    }
  };

  const handleplaypause = (id) => {
    const videoElement = videoRefs.current[id];
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    } else {
      console.log("Video element not found.");
    }
  };

  const toggleLike = (id) => {
    if (likedRef.current[id]) {
      const isLiked = likedRef.current[id].textContent === "Liked";

      likedRef.current[id].textContent = isLiked ? "Like" : "Liked";
    }
  };
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar scroll-smooth md:max-w-lg md:mx-auto bg-black">
      {reels.length !== 0 ? (
        reels.map((reel) => {
          const { id, videoUrl } = reel;
          return (
            <div
              key={id}
              className="h-screen snap-center bg-[#000000] relative"
              onClick={() => handleplaypause(id)}
            >
              <video
                ref={(currentVideo) => (videoRefs.current[id] = currentVideo)}
                src={`${videoUrl}?${new Date().getTime()}`}
                loop
                autoPlay
                muted
                className="h-screen object-fit"
              ></video>
              <div className="flex flex-row gap-2 z-50 top-6 left-6 absolute">
                <Link href="/" className="cursor-pointer">
                  <Image
                    src={home}
                    alt="home"
                    className="cursor-pointer size-12 max-sm:size-10 bg-[#ffffff] rounded-full p-2"
                  />
                </Link>
                <button
                  ref={(currentButton) =>
                    (buttonRefs.current[id] = currentButton)
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSound(id);
                  }}
                >
                  Unmute
                </button>
              </div>
              <div className="flex flex-col items-end gap-2 z-50 right-6 bottom-10 absolute">
                <button
                  ref={(currentButton) =>
                    (likedRef.current[id] = currentButton)
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLike(id);
                  }}
                >
                  Like
                </button>

                <button>Share</button>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Reels;
