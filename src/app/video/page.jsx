"use client";

import { useContext, useEffect, useRef } from "react";
import { ContextData } from "../../context/Context";
import Link from "next/link";
import home from "../assets/home.png";
import Image from "next/image";
import { motion } from "framer-motion";
import ShareModal from "../components/ShareModal";
import share from "../assets/share.svg";
import lottie from "lottie-web";
import likeAnimation from "../assets/like.json";

function page() {
  const { reels, setOpenShareModal } = useContext(ContextData);
  const videoRefs = useRef({});
  const buttonRefs = useRef({});
  const likeRefs = useRef({});

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

  const handleLike = (id) => {
    if (videoRefs.current[id]) {
      const video = videoRefs.current[id];
      video.liked = !video.liked;

      if (likeRefs.current[id]) {
        likeRefs.current[id].textContent = video.liked ? "Liked" : "Like";
      }
    }
  };

  useEffect(() => {
    const handleAnimation = (id) => {
      if (videoRefs.current[id] && videoRefs.current[id].liked) {
        const animationContainer = document.createElement("div");
        animationContainer.className =
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] z-50";
        document.body.appendChild(animationContainer);

        const animation = lottie.loadAnimation({
          container: animationContainer,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: likeAnimation,
        });

        animation.addEventListener("complete", () => {
          animation.destroy();
          animationContainer.remove();
        });
      }
    };

    Object.keys(videoRefs.current).forEach((id) => {
      if (videoRefs.current[id].liked) {
        handleAnimation(id);
      }
    });
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
                id={id}
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
                {[author, author, author].map((text, idx) => (
                  <Link
                    href="/"
                    key={idx}
                    className="hover:scale-105 transition-transform duration-300 mb-2"
                  >
                    <motion.span
                      variants={itemVariants}
                      className="border-2 border-[#fbb13c] px-3 py-1 rounded-[10px] bg-[#fbb13c] text-[#000000] font-bold"
                    >
                      {text}
                    </motion.span>
                  </Link>
                ))}
              </motion.div>
              <div className="flex flex-col gap-2 z-50 bottom-36 right-6 absolute">
                <button
                  ref={(currentButton) =>
                    (likeRefs.current[id] = currentButton)
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLike(id);
                  }}
                  className="cursor-pointer bg-[#ffffff] rounded-full p-2 text-[#000000]"
                >
                  Like
                </button>
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
