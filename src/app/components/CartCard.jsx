"use client";

import React, { useContext } from "react";
import { ContextData } from "../../context/Context";

function CartCard({ product }) {
  const { updateQuantity } = useContext(ContextData);

  return (
    <div className="flex flex-row justify-start items-center bg-[#ffffff] rounded-2xl text-[#000000]">
      <div className="flex flex-row items-start">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={120}
          height={120}
          className="mr-4"
        />
        <div className="flex flex-col gap-2">
          <div className="font-bold py-4 px-2">{product.title}</div>
          <div className="flex flex-row justify-start items-center gap-4 px-4 pt-2 pb-4">
            <button
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
            >
              -
            </button>
            <div className="font-bold border border-[#000000] rounded px-2 ">
              {product.quantity}
            </div>
            <button
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
