"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Korzinka from "../../assets/icons/korzinka";
import Sorch from "../../assets/icons/sorch";
import { Badge } from "../ui/badge";
import Burger from "../../assets/icons/burger";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Menu,
  Store,
  Heart,
  User,
  X,
  LeafIcon,
  CandyIcon,
  SnowflakeIcon,
  EggIcon,
  AppleIcon,
  MessageSquareTextIcon,
  BriefcaseMedical,
} from "lucide-react";
import { removeItemCompletely } from "@/redux/features/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SecureIcon } from "../../assets/icons/secure-icon";
import ScrolIcon from "@/assets/icons/scrolIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemCompletely(id));
  };

  const pages = [
    {
      id: 1,
      title: "About Us",
      path: "about-us",
    },
    {
      id: 2,
      title: "My Account",
      path: "my-account",
    },
    {
      id: 3,
      title: "Wishlist",
      path: "wishlist",
    },
    {
      id: 4,
      title: "Order Tracking",
      path: "order-tracking",
    },
  ];
  return (
    <header className="w-full bg-white shadow-sm">
      <div className=" bg-[#233a95] w-[100%]">
        <div className="container">
          <h3 className="text-[12px] text-center py-[9px]  text-white ">
            Due to the <strong className="font-bold"> COVID 19</strong>
            epidemic, orders may be processed with a slight delay
          </h3>
        </div>
      </div>
      <div className="h-[40px] lg:grid items-center border-b hidden py-[10px] ml-[60px]">
        <div className="container">
          <div className="lg:flex items-center justify-between  ">
            <ul className="flex items-center gap-[15px]">
              {pages?.map((item) => (
                <li key={item.id}>
                  <Link
                    className="text-[12px] text-current hover:text-[#2bbef9] "
                    key={item.id}
                    href={item.path}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <SecureIcon />
              <h4 className="text-[12px] text-current pr-[20px] border-r ">
                100% Secure delivery without contacting the courier
              </h4>
              <h4 className="font-[400] leading-[150%] text-[12px] text-current ml-[20px]">
                <Link href={"#"} className="mr-[5px]">
                  Need help?
                </Link>
                <Link href={"tel:+0020500"}>
                  Call Us:
                  <span className="font-[700] text-[#2bbef9]">+ 0020 500</span>
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100">
        <div className="container mx-auto max-w-[1200px] py-3 px-4 lg:px-0">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent p-4"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>

            <div className="ml-[-45px] flex flex-col items-center lg:items-start">
              <Image
                src="/logo.png"
                alt="logo"
                width={250}
                height={250}
                className="mb-1 hidden lg:block"
              />
              <Image
                src="/min-logo.png"
                alt="logo"
                width={110}
                height={90}
                className="lg:hidden"
              />
            </div>

            <div className="flex-1 max-w-[600px] mx-8 hidden lg:block">
              <div className="relative">
                <Input
                  className="w-full border border-gray-200 rounded-full px-6 py-7 bg-[#f3f4f7]"
                  placeholder="Search for products..."
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full w-12 h-12"
                  variant="ghost"
                >
                  <Sorch />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Link className="hidden lg:block" href="/register">
                <User />
              </Link>
              <div className="flex items-center gap-5">
                {/* Narx */}
                <span className="text-sm font-semibold text-gray-900 lg:text-base flex items-center justify-center h-[40px] lg:h-[45px]">
                  ${totalAmount.toFixed(2)}
                </span>

                {/* DropdownMenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative cursor-pointer flex items-center justify-center h-[40px] lg:h-[45px]">
                      <Badge
                        className="rounded-full lg:w-[45px] lg:h-[45px] bg-gradient-to-r from-red-200 to-pink-200 hover:bg-gradient-to-r hover:from-pink-300"
                        variant="outline"
                      >
                        <Korzinka />
                      </Badge>

                      {totalQuantity > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] lg:text-xs font-medium rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[320px] p-0 border border-gray-100 rounded-lg shadow-lg"
                    align="end"
                  >
                    {items.length === 0 ? (
                      <div className="py-8 px-4">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <Image
                              src="/korzinka.png"
                              alt="Empty Cart"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                        <p className="text-center text-gray-700 font-medium mb-1">
                          No products in the cart.
                        </p>
                        <p className="text-gray-500 text-xs text-center">
                          We reduce shipping prices to only 2.49 €!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[300px] overflow-auto">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-[60px] h-[60px] object-contain rounded bg-gray-50"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm text-gray-700 font-medium line-clamp-2">
                                  {item.title}
                                </h4>
                                <div className="flex items-center text-sm mt-1">
                                  <span className="text-gray-500">
                                    {item.quantity} ×
                                  </span>
                                  <span className="text-red-500 font-bold ml-1">
                                    ${item.price}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-[#233a95] font-bold">
                              ${totalAmount.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Link href="/cart" className="flex-1">
                              <Button
                                variant="outline"
                                className="w-full bg-white hover:bg-gray-50 border-gray-200"
                              >
                                View cart
                              </Button>
                            </Link>
                            <Link href="/checkout" className="flex-1">
                              <Button className="w-full bg-[#233a95] hover:bg-[#233a95]/90 text-white">
                                Checkout
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block container mx-auto max-w-[1300px] py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-[#38e4f1] hover:bg-[#5e83e0]/90 text-white text-[20px] rounded-full px-9 py-4 flex items-center gap-4"
            >
              <Burger />
              <span className="font-medium">All Categories</span>
              <ScrolIcon />
            </button>

            {/* Kategoriyalar menyusi */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-[300px] bg-white shadow-lg rounded-lg mt-2 z-50">
                <div className="p-4 border-b">
                  <span className="text-blue-500 font-semibold">
                    TOTAL 63 PRODUCTS
                  </span>
                </div>
                <ul className="py-2">
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <AppleIcon />
                    <span>Fruits & Vegetables</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <MessageSquareTextIcon />
                    <span>Meats & Seafood</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <EggIcon />
                    <span>Breakfast & Dairy</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <EggIcon />
                    <span>Beverages</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <BriefcaseMedical />
                    <span>Breads & Bakery</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <SnowflakeIcon />
                    <span>Frozen Foods</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <CandyIcon />
                    <span>Biscuits & Snacks</span>
                  </li>
                  <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                    <LeafIcon />
                    <span>Grocery & Staples</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <nav className="flex items-center gap-10">
            {["Meats & Seafood", "Bakery", "Beverages", "Blog", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-gray-700 hover:text-[#233a95] text-[20px] font-medium transition-colors"
                >
                  {item.toUpperCase()}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <Store className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Store</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center py-2 px-1">
            <Sorch />
            <span className="text-[10px] mt-1 text-gray-600">Search</span>
          </Link>
          <Link
            href="/categories"
            className="flex flex-col items-center py-2 px-1"
          >
            <div className="rounded-full bg-[#233a95] p-2.5 -mt-7 shadow-lg border-[3px] border-white">
              <Burger />
            </div>
            <span className="text-[10px] mt-1 text-gray-600">Categories</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center py-2 px-1"
          >
            <Heart className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Wishlist</span>
          </Link>
          <Link
            href="/account"
            className="flex flex-col items-center py-2 px-1"
          >
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Account</span>
          </Link>
        </div>
      </div>

      <div className="h-16 lg:hidden" />
    </header>
  );
};

export default Header;
