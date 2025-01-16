import React, { useContext } from "react";
import ritividhilogo from "../../assets/ritividhilogo.webp";
import menuicon from "../../assets/menuicon.svg";
import searchiconmobile from "../../assets/searchiconmobile.svg";
import accounticon from "../../assets/accounticon.svg";
import carticonmobile from "../../assets/carticonmobile.svg";
import NavigationItems from "./navbarComponents/NavigationItems";
import Account from "./navbarComponents/Account";
import { NavLink } from "react-router-dom";
import { ContextData } from "../../context/Context";
import NavModal from "../modals/NavModal";

function NavBar() {
  const { setOpenloginmodal, handlenavOpen, loggedIn } =
    useContext(ContextData);

  return (
    <>
      <div className="bg-[#ffffff] top-0 px-[8%] max-xl:px-[4%] max-lg:px-[8%] py-4 flex flex-row justify-between items-center max-lg:hidden">
        <NavLink to="/">
          <img
            src={ritividhilogo}
            alt="Ritividhi Logo"
            className="cursor-pointer w-[90px] h-[70px]"
          />
        </NavLink>
        <NavigationItems />
        <Account />
      </div>

      <div className="hidden max-lg:flex max-lg:flex-row max-lg:justify-around max-lg:items-center max-lg:py-4">
        <div className="flex flex-row gap-8 max-sm:gap-5">
          <img
            src={menuicon}
            alt="Menu"
            className="cursor-pointer size-6"
            onClick={handlenavOpen}
          />
          <img
            src={searchiconmobile}
            alt="Search"
            className="cursor-pointer size-6 invisible"
          />
        </div>
        <NavLink to="/">
          <img
            src={ritividhilogo}
            alt="Ritividhi Logo"
            className="cursor-pointer w-[90px] h-[70px]"
          />
        </NavLink>
        <div className="flex flex-row gap-8 max-sm:gap-5">
          {loggedIn ? (
            <NavLink to="/user">
              <img
                src={accounticon}
                alt="Account"
                className="cursor-pointer size-6"
              />
            </NavLink>
          ) : (
            <img
              src={accounticon}
              alt="Account"
              className="cursor-pointer size-6"
              onClick={() => setOpenloginmodal(true)}
            />
          )}
          <NavLink to="/cart">
            <img
              src={carticonmobile}
              alt="Cart"
              className="cursor-pointer size-6"
            />
          </NavLink>
        </div>
      </div>
      <NavModal />
    </>
  );
}

export default NavBar;
