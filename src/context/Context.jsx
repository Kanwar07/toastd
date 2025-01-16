"use client";

import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ContextData = createContext();

export function ContextProvider({ children }) {
  const [reels, setReels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openNavModal, setOpenNavModal] = useState(false);
  const [cartdata, setcartdata] = useState([]);
  const [total, settotal] = useState([]);
  const [cartquantity, setcartquantity] = useState(0);

  useEffect(() => {
    const fetchreels = async () => {
      //"https://dummyjson.com/c/65b7-f6c3-44e4-982c
      //const response = await fetch("https://toastd.in/api/file/tapes");
      const response = await fetch(
        "https://dummyjson.com/c/65b7-f6c3-44e4-982c",
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const reelsdate = await response.json();
      setReels(reelsdate);
    };
    fetchreels();
  }, []);

  useEffect(() => {
    const fetchcategory = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const dataWithQuantity = data.products.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCategories(dataWithQuantity);
    };
    fetchcategory();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartdatafromstorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const carttotalfromstorage =
        parseFloat(localStorage.getItem("total")) || 0;

      setcartdata(cartdatafromstorage);
      settotal(carttotalfromstorage);
    }
  }, []);

  useEffect(() => {
    let totalcartquantity = cartdata.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setcartquantity(totalcartquantity);
  }, [cartdata]);

  const getcarddata = (id, price) => {
    if (itemsinCart(id)) {
      toast.error("Item Already in Cart");
    } else {
      const foundProduct = categories.find((product) => product.id === id);
      const parsedTotal = parseFloat(total);
      const newTotal = parsedTotal + price;
      const updatedCartData = [...cartdata, foundProduct];
      setcartdata(updatedCartData);
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      settotal(newTotal.toFixed(2));
      localStorage.setItem("total", newTotal.toFixed(2));
      toast("Item added to cart, Kindly increase the quantity in Cart", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const itemsinCart = (id) => {
    return cartdata.some((item) => item.id === id);
  };

  const removeCartItems = (id) => {
    let updatedCart = cartdata.filter((item) => item.id !== id);
    let updatedTotal = updatedCart
      .map((item) => item.price * item.quantity)
      .reduce((total, n) => total + n, 0)
      .toFixed(2);
    setcartdata(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    settotal(updatedTotal);
    localStorage.setItem("total", JSON.stringify(updatedTotal));
    toast("Item removed from cart", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const updateQuantity = (id, value) => {
    if (value === 0) {
      removeCartItems(id);
    } else {
      let updatedCart = cartdata.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      );
      let updatedTotal = updatedCart
        .map((item) => item.price * item.quantity)
        .reduce((total, n) => total + n)
        .toFixed(2);
      setcartdata(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      settotal(updatedTotal);
      localStorage.setItem("total", updatedTotal);
    }
  };

  const orderconfirm = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.removeItem("cartquantity");
    toast.success("Order Confirmed");
    setcartdata([]);
    settotal(0);
  };

  const handlenavOpen = () => {
    setOpenNavModal(true);
  };

  const handleNavClose = () => {
    setOpenNavModal(false);
  };

  return (
    <ContextData.Provider
      value={{
        reels,
        categories,
        handlenavOpen,
        handleNavClose,
        openNavModal,
        cartdata,
        total,
        cartquantity,
        getcarddata,
        removeCartItems,
        updateQuantity,
        orderconfirm,
      }}
    >
      {children}
    </ContextData.Provider>
  );
}
