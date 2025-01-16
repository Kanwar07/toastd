"use client";

import React, { useContext } from "react";
import { ContextData } from "../../context/Context";
import CartCard from "../components/CartCard";
import { motion } from "framer-motion";
import Image from "next/image";
import menuicon from "../assets/menuicon.svg";
import searchiconmobile from "../assets/searchiconmobile.svg";
import accounticon from "../assets/accounticon.svg";
import carticonmobile from "../assets/carticonmobile.svg";
import logo from "../assets/logo.png";
import NavModal from "../components/NavModal";
import Link from "next/link";
import Footer from "../Footer";

function page() {
  const { cartdata, handleNavOpen, orderconfirm, total, cartquantity } =
    useContext(ContextData);

  return (
    <div className="h-screen w-full relative flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="w-1/2 max-md:w-full">
          <div className="sticky z-50 absolute top-0 flex flex-row justify-around items-center py-6 bg-[#ffffff]">
            <div className="flex flex-row gap-8 max-sm:gap-5">
              <Image
                src={menuicon}
                alt="Menu"
                className="cursor-pointer size-8 max-sm:size-5"
                onClick={handleNavOpen}
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
          <div className="bg-[#ffffff]">
            <motion.div
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="flex flex-col justify-between gap-4 py-5 px-5"
            >
              {cartdata.length !== 0 ? (
                cartdata.map((cart, index) => {
                  return (
                    <motion.div key={index}>
                      <CartCard product={cart} />
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="mt-10 text-[#000000] h-screen"
                >
                  Kindly add products from products page
                </motion.div>
              )}
              <div className="flex flex-row justify-between max-md:flex-col items-center">
                {cartdata.length !== 0 ? (
                  <div className="text-[#000000] text-[20px] font-bold">
                    Cart Total: ${total}
                  </div>
                ) : null}

                <div className="flex justify-center items-center mx-10 my-2 text-[#000000] text-[18px]">
                  {cartdata.length !== 0 ? (
                    <button
                      onClick={() => {
                        orderconfirm();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="border border-[#000000] text-[#ffffff] bg-[#a78770] px-4 py-2 rounded-lg shadow-lg"
                    >
                      Place Order
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <NavModal />
      </div>
      <div className="sticky absolute w-screen bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default page;
