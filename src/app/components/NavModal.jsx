"use client";

import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { ContextData } from "../../context/Context";
import { motion } from "framer-motion";
import cross from "../assets/cross.svg";
import home from "../assets/home.png";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import pinterest from "../assets/pinterest.svg";
import linkedin from "../assets/linkedin.svg";
import youtube from "../assets/youtube.svg";
import Image from "next/image";
import logo from "../assets/logo.png";
import reels from "../assets/reels.svg";
import Link from "next/link";

function NavModal() {
  const { openNavModal, handleNavClose } = useContext(ContextData);

  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleNavClose();
      setIsExiting(false);
    }, 500);
  };

  const modalVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  return (
    <Modal
      open={openNavModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        transition={{ duration: 0.5 }}
        className={`flex flex-col justify-between absolute w-1/3 max-lg:w-2/5 max-md:w-3/4 max-sm:w-full h-full left-0 bg-white border-2 border-[#FF8213CC] shadow-xl px-8 py-5 overflow-y-auto max-h-screen`}
      >
        <div>
          <div className="flex flex-row justify-between items-center py-5">
            <Image
              src={logo}
              alt="Toasted"
              className="cursor-pointer w-[160px]"
              onClick={handleClose}
            />
            <Image
              src={cross}
              alt="cross"
              className="size-8 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="flex flex-col items-start gap-6 text-[#000000] font-sans text-[18px] font-semibold my-10 w-full">
            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4"
            >
              <Image src={home} alt="Home" className=" cursor-pointer size-8" />
              <button>Home</button>
            </Link>
            <hr className="h-[1px] w-full bg-[#A9A9A9]" />
            <Link
              href="/reels"
              onClick={handleClose}
              className="flex flex-row items-center gap-4"
            >
              <Image
                src={reels}
                alt="reels"
                className="cursor-pointer size-9"
              />
              <button>Reels</button>
            </Link>
            <hr className="h-[1px] w-full bg-[#A9A9A9]" />
            <Link
              href="/"
              onClick={handleClose}
              style={{
                backgroundColor: "#fbb13c",
                color: "#000000",
                border: "1px solid #fbb13c",
                padding: "8px 16px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Login / Create an account
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#000000] font-sans text-[20px] font-semibold no-warp flex-shrink-0">
            Follow Us At
          </span>
          <div className="flex flex-row gap-4">
            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4 wrap"
            >
              <Image src={facebook} alt="Facebook logo" className="size-8" />
            </Link>

            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4 wrap"
            >
              <Image src={instagram} alt="instagram" className="size-8" />
            </Link>

            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4 wrap"
            >
              <Image src={pinterest} alt="pinterest" className="size-8" />
            </Link>

            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4 wrap"
            >
              <Image src={linkedin} alt="linkedin" className="size-8" />
            </Link>

            <Link
              href="/"
              onClick={handleClose}
              className="flex flex-row items-center gap-4 wrap"
            >
              <Image src={youtube} alt="youtube" className="size-10" />
            </Link>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

export default NavModal;
