"use client";

import { ContextData } from "@/context/Context";
import { Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import menuicon from "./assets/menuicon.svg";
import searchiconmobile from "./assets/searchiconmobile.svg";
import accounticon from "./assets/accounticon.svg";
import carticonmobile from "./assets/carticonmobile.svg";
import logo from "./assets/logo.png";
import Image from "next/image";
import NavModal from "./components/NavModal";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

function HomePage() {
  const {
    categories,
    handlenavOpen,
    cartdata,
    getcarddata,
    removeCartItems,
    cartquantity,
  } = useContext(ContextData);

  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleClose = () => {
    setOpenId(null);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 max-md:w-full">
        <div className="sticky z-50 absolute top-0 flex flex-row justify-around items-center py-6 bg-[#ffffff]">
          <div className="flex flex-row gap-8 max-sm:gap-5">
            <Image
              src={menuicon}
              alt="Menu"
              className="cursor-pointer size-8 max-sm:size-5"
              onClick={handlenavOpen}
            />
            <Image
              src={searchiconmobile}
              alt="Search"
              className="cursor-pointer size-8 max-sm:size-5"
            />
          </div>
          <Link href="/">
            <Image
              src={logo}
              alt="Toastd"
              className="cursor-pointer w-[240px] max-sm:w-[140px]"
            />
          </Link>
          <div className="flex flex-row gap-8 max-sm:gap-5">
            <Link href="/account">
              <Image
                src={accounticon}
                alt="Account"
                className="cursor-pointer size-8 max-sm:size-5"
              />
            </Link>
            <Link href="/cart">
              <div className="relative">
                <Image
                  src={carticonmobile}
                  alt="Cart"
                  className="cursor-pointer size-8 max-sm:size-5"
                />
                <div className="absolute -top-3 -right-2 text-[#000000]">
                  {cartquantity}
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="h-[150px] bg-[#ffffff] text-[#000000] w-full flex justify-center items-center">
          <span className="text-[32px] max-sm:text-[26px]">
            Today’s Latest Products
          </span>
        </div>
        {categories && categories.length != 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            className="flex flex-col justify-between gap-4 py-5 bg-[#ffffff]"
          >
            {categories.map((category) => {
              const {
                id,
                thumbnail,
                description,
                title,
                price,
                rating,
                discountPercentage,
              } = category;

              return (
                <motion.div
                  variants={itemVariants}
                  key={id}
                  className="flex flex-row max-sm:flex-col justify-between gap-2 mx-[5%] text-[#000000] bg-[#d3d3d3] px-10 max-sm:px-5 py-4 max-sm:py-2 rounded-[10px] shadow-lg"
                >
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="size-28 my-2 bg-[#ffffff] rounded-[10px]"
                    />
                    <div className="flex flex-row">
                      <span>{title}</span>
                      <Tooltip
                        key={id}
                        title={description}
                        arrow
                        open={openId === id}
                        onClose={handleClose}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                      >
                        <IconButton onClick={() => handleClick(id)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex flex-col max-md:flex-row gap-2 justify-between max-sm:items-end">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <span>₹</span> <span>{price}</span>
                        <div className="flex flex-row gap-1 text-[#FF0000] text-[12px]">
                          <div>
                            <span>{discountPercentage}</span>
                            <span>%</span>
                          </div>
                          <span>off</span>
                        </div>
                      </div>
                      <Rating
                        name="size-small"
                        defaultValue={rating}
                        size="small"
                      />
                    </div>
                    <div className="flex flex-row items-end mx-4">
                      {cartdata.filter((data) => data.title === title).length >
                      0 ? (
                        <button
                          className="text-[#000000] bg-[#bcbcbc] pt-2 pr-2 pb-2 pl-2 rounded-lg mr-2"
                          onClick={() => removeCartItems(id)}
                        >
                          REMOVE
                        </button>
                      ) : (
                        <button
                          className="text-[#000000] bg-[#bcbcbc] pt-2 pr-2 pb-2 pl-2 rounded-lg mr-2"
                          onClick={() => getcarddata(id, price)}
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="flex items-center pb-20 justify-center bg-[#ffffff] text-[#000000] text-[24px] h-full">
            Loading...
          </div>
        )}
      </div>
      <NavModal />
    </div>
  );
}

export default HomePage;
