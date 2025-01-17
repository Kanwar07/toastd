"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ContextData } from "../../context/Context";
import Link from "next/link";
import home from "../assets/home.png";
import Image from "next/image";
import { motion } from "framer-motion";
import ShareModal from "../components/ShareModal";
import share from "../assets/share.svg";

function page() {
  const { reels, setOpenShareModal } = useContext(ContextData);
  const videoRefs = useRef({});
  const buttonRefs = useRef({});
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const title = "Check this out!";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    const options = { root: null, threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = videoRefs.current[entry.target.id];
        if (video) {
          if (entry.isIntersecting) video.play();
          else video.pause();
        }
      });
    }, options);

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) observer.unobserve(video);
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
      if (videoElement.paused) videoElement.play();
      else videoElement.pause();
    } else {
      console.log("Video element not found.");
    }
  };

  const handleShareClick = (event) => {
    event.stopPropagation();
  };

  const handleShareOpen = (event) => {
    event.stopPropagation();
    setOpenShareModal(true);
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar scroll-smooth md:max-w-lg md:mx-auto bg-black">
      {reels.length !== 0 ? (
        reels.map((reel) => {
          const { id, videoUrl, author } = reel;
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
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-row w-3/4 flex-wrap gap-2 z-50 bottom-36 left-6 absolute text-[10px]"
              >
                <Link
                  href="/"
                  className="hover:scale-105 transition-transform duration-300 mb-2"
                >
                  <motion.span
                    variants={itemVariants}
                    className="border-2 border-[#fbb13c] px-3 py-1 rounded-[10px] bg-[#fbb13c] text-[#000000] font-bold"
                  >
                    {author}
                  </motion.span>
                </Link>
                <Link
                  href="/"
                  className="hover:scale-105 transition-transform duration-300 mb-2"
                >
                  <motion.span
                    variants={itemVariants}
                    className="border-2 border-[#fbb13c] px-3 py-1 rounded-[10px] bg-[#fbb13c] text-[#000000] font-bold"
                  >
                    {author}
                  </motion.span>
                </Link>
                <Link
                  href="/"
                  className="hover:scale-105 transition-transform duration-300 mb-2"
                >
                  <motion.span
                    variants={itemVariants}
                    className="border-2 border-[#fbb13c] px-3 py-1 rounded-[10px] bg-[#fbb13c] text-[#000000] font-bold"
                  >
                    {author}
                  </motion.span>
                </Link>
              </motion.div>
              <div className="flex flex-col gap-2 z-50 bottom-36 right-6 absolute">
                <button>Like</button>
                <button onClick={handleShareOpen}>
                  <Image
                    src={share}
                    alt="share"
                    className="cursor-pointer size-12 max-sm:size-10 bg-[#ffffff] rounded-full p-2"
                  />
                </button>
              </div>
              <ShareModal
                url={videoUrl}
                quote={title}
                onClick={handleShareClick}
              />
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default page;
