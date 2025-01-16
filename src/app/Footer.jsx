import Link from "next/link";
import React from "react";
import reels from "./assets/reels.svg";
import Image from "next/image";
import home from "./assets/home.png";
import searchiconmobile from "./assets/searchiconmobile.svg";

function Footer() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 max-md:w-full">
        <div className="flex flex-row items-end justify-between w-full text-[#000000] bg-[#ffffff] px-6 pt-2 pb-4 border-t-2 border-[#000000]">
          <span>
            <Image
              src={searchiconmobile}
              alt="searchiconmobile"
              className="cursor-pointer size-7"
            />
          </span>
          <Link href="/">
            <Image src={home} alt="home" className="cursor-pointer size-12" />
          </Link>
          <Link href="/reel">
            <Image src={reels} alt="reels" className="cursor-pointer size-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
