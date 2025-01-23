"use client";

import { productDataType } from "@/service/queryes";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Maximize2, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";

const Prodacts = ({ id, title, price, image }: productDataType) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const [isAdded, setIsAdded] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const cartData = localStorage.getItem("bacola-cart");
    if (cartData) {
      const { items } = JSON.parse(cartData);
      const existingItem = items.find((item: any) => item.id === id);
      setIsAdded(!!existingItem);
    }
  }, [id]);

  // Update state when cart changes
  useEffect(() => {
    if (itemInCart?.quantity === 0 || !itemInCart) {
      setIsAdded(false);
      // Update localStorage
      const cartData = localStorage.getItem("bacola-cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        cart.items = cart.items.filter((item: any) => item.id !== id);
        localStorage.setItem("bacola-cart", JSON.stringify(cart));
      }
    } else {
      setIsAdded(true);
      // Update localStorage
      const cartData = localStorage.getItem("bacola-cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        const existingItemIndex = cart.items.findIndex(
          (item: any) => item.id === id
        );
        if (existingItemIndex >= 0) {
          cart.items[existingItemIndex] = itemInCart;
        } else {
          cart.items.push(itemInCart);
        }
        localStorage.setItem("bacola-cart", JSON.stringify(cart));
      }
    }
  }, [itemInCart, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 }));
    setIsAdded(true);
  };

  const handleIncrement = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 }));
  };

  const handleDecrement = () => {
    if (itemInCart?.quantity === 1) {
      dispatch(removeFromCart(id));
      setIsAdded(false);
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 hover:scale-105 transition-transform transform relative">
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-2 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <Link href={`/product/${id}`}>
        <h3 className="text-gray-800 font-medium text-[15px] mb-2 hover:text-blue-600">
          {title}
        </h3>
      </Link>
      <p className="text-green-500 text-[12px]">IN STOCK</p>
      <div className="flex items-center mb-4 gap-2">
        <p className="line-through text-[15px] text-gray-500 font-medium">
          $20.00
        </p>
        <p className="text-red-500 font-bold text-xl mr-2">${price}</p>
      </div>

      {!isAdded ? (
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#233a95] hover:bg-[#233a95]/90 text-white h-[45px] sm:h-[50px] rounded-lg px-4"
        >
          Add to cart
        </Button>
      ) : (
        <div className="flex items-center justify-between border rounded-lg">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg border-r"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium text-lg px-4">
            {itemInCart?.quantity || 0}
          </span>
          <button
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg border-l bg-[#FDC040]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Prodacts;
