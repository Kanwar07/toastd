"use client";

import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ContextData = createContext();

export function ContextProvider({ children }) {
  const [reels, setReels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openNavModal, setOpenNavModal] = useState(false);
  const [cartdata, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartquantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchReels = async () => {
      const response = await fetch(
        "https://dummyjson.com/c/65b7-f6c3-44e4-982c"
      );
      const reelsDate = await response.json();
      setReels(reelsDate);
    };
    fetchReels();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const dataWithQuantity = data.products.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCategories(dataWithQuantity);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cartDataFromStorage = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const cartTotalFromStorage =
          parseFloat(localStorage.getItem("total")) || 0;

        setCartData(cartDataFromStorage);
        setTotal(cartTotalFromStorage);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setCartData([]);
        setTotal(0);
      }
    }
  }, []);

  useEffect(() => {
    const totalCartQuantity = cartdata.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(totalCartQuantity);
  }, [cartdata]);

  const getCardData = (id, price) => {
    if (itemsInCart(id)) {
      toast.error("Item Already in Cart");
    } else {
      const foundProduct = categories.find((product) => product.id === id);
      const parsedTotal = parseFloat(total);
      const newTotal = parsedTotal + price;
      const updatedCartData = [...cartdata, foundProduct];

      setCartData(updatedCartData);
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      setTotal(newTotal.toFixed(2));
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

  const itemsInCart = (id) => {
    return cartdata.some((item) => item.id === id);
  };

  const removeCartItems = (id) => {
    const updatedCart = cartdata.filter((item) => item.id !== id);
    const updatedTotal = updatedCart
      .map((item) => item.price * item.quantity)
      .reduce((total, n) => total + n, 0)
      .toFixed(2);

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedTotal);
    localStorage.setItem("total", updatedTotal);

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
      const updatedCart = cartdata.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      );
      const updatedTotal = updatedCart
        .map((item) => item.price * item.quantity)
        .reduce((total, n) => total + n, 0)
        .toFixed(2);

      setCartData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTotal(updatedTotal);
      localStorage.setItem("total", updatedTotal);
    }
  };

  const orderConfirm = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.removeItem("cartquantity");

    toast.success("Order Confirmed");
    setCartData([]);
    setTotal(0);
  };

  const handleNavOpen = () => {
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
        handleNavOpen,
        handleNavClose,
        openNavModal,
        cartdata,
        total,
        cartquantity,
        getCardData,
        removeCartItems,
        updateQuantity,
        orderConfirm,
      }}
    >
      {children}
    </ContextData.Provider>
  );
}
