"use client";

import Link from "next/link";
import React, { useState } from "react";
import menu from "../public/Assets/menu.svg";
import blackmenu from "../public/Assets/blackmenu.svg";
import close from "../public/Assets/close.svg";
import blackclose from "../public/Assets/blackClose.svg";
import Image from "next/image";
import Toggle from "./ui/Toggle";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export const Header = () => {
  const { theme } = useTheme();
  const navToggleClose = theme === "light" ? blackclose : close;
  const navToggleOpen = theme === "light" ? blackmenu : menu;
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("Home");
  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const navItems = [
    {
      name: "Home",
      link: "",
      duration: 500,
    },
    {
      name: "Profile",
      link: "profile",
      duration: 1500,
    },
    {
      name: "Upload Files",
      link: "upload",
      duration: 2000,
    },
    {
      name: "My Files",
      link: "my-files",
      duration: 2500,
    },
  ];

  return (
    <>
      <nav className="hidden lg:flex flex-row items-center justify-between py-8 mx-auto px-12 w-full relative bg-customwhite dark:bg-customblack z-20">
        <div className="flex flex-row justify-between items-center space-x-1">
          <Link
            href="#Hero"
            className="font-bold text-2xl tracking-normal text-black dark:text-white"
          >
            PK
          </Link>
        </div>
        <div className="lg:flex flex-row flex-1 hidden items-center  justify-center space-x-8 lg:space-x-14 text-md text-black dark:text-white font-medium hover:text-gray-600 dark:hover:text-white transition duration-200">
          <Link href="/">
            <span>Home</span>
          </Link>
          <Link href={!userId ? "/sign-in" : "/profile"}>
            <span>Profile</span>
          </Link>
          <Link href={!userId ? "/sign-in" : "/upload"}>
            <span>Upload Files</span>
          </Link>
          <Link href={!userId ? "/sign-in" : "/my-files"}>
            <span>My Files</span>
          </Link>
        </div>
        <Toggle />
        {!userId ? (
          <>
            <Link
              href="/sign-in"
              className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Get started</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </Link>
          </>
        ) : (
          <>
            <UserButton />
          </>
        )}
      </nav>

      <div className="bg-customwhite dark:bg-customblack w-full flex items-center justify-between">
        <div className="flex lg:hidden">
          <Toggle />
          {!userId ? (
            <></>
          ) : (
            <div className="mt-1.5">
              <UserButton />
            </div>
          )}
        </div>
        <nav className="lg:hidden flex justify-end items-center p-4">
          <Image
            src={toggle ? navToggleClose : navToggleOpen}
            alt="menu"
            height={28}
            width={28}
            className="w-[28px] h-[28px] mx-4 object-contain cursor-pointer z-50"
            onClick={toggleMenu}
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6  absolute top-10 right-0 mx-4 my-2 min-w-[140px] rounded-3xl sidebar bg-white dark:bg-black  z-50 `}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navItems.map((navItem, idx) => (
                <li
                  key={idx}
                  className={`font-poppins font-medium cursor-pointer text-[26px] ${
                    active === navItem.name
                      ? "dark:text-white text-black"
                      : "dark:text-dimwhite text-gray-700"
                  } ${idx === navItems.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => {
                    setActive(navItem.name);
                    toggleMenu();
                  }}
                >
                  <Link href={`/${navItem.link}`}>
                    <span>{navItem.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
