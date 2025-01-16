"use client";

import React, { useContext } from "react";
import Link from "next/link";
import menuicon from "../assets/menuicon.svg";
import searchiconmobile from "../assets/searchiconmobile.svg";
import accounticon from "../assets/accounticon.svg";
import carticonmobile from "../assets/carticonmobile.svg";
import logo from "../assets/logo.png";
import Image from "next/image";
import { ContextData } from "../../context/Context";
import NavModal from "../components/NavModal";
import Footer from "../Footer";

function page() {
  const { handlenavOpen, cartquantity } = useContext(ContextData);

  return (
    <div className="h-screen w-full relative flex flex-col justify-between">
      <div className="bg-[#ffffff] h-screen w-full">
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
        <div className="flex items-center w-full justify-center bg-[#ffffff] text-[#000000] text-[24px] pt-20">
          Coming Soon...
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
