"use client";
import React from "react";
import { TbBrandInstagram } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";
import { BiLogoGithub } from "react-icons/bi";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Footer = () => {
  const { userId } = useAuth();
  return (
    <>
      <footer className="bg-customwhite dark:bg-neutral-950">
        <div className="mx-auto max-w-3xl py-8">
          <ul className="translate-y-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <Link
                href="/"
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href={!userId ? "/sign-in" : "/profile"}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              >
                Profile
              </Link>
            </li>

            <li>
              <Link
                href={!userId ? "/sign-in" : "/upload"}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              >
                Upload Files
              </Link>
            </li>

            <li>
              <Link
                href={!userId ? "/sign-in" : "/my-files"}
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              >
                My files
              </Link>
            </li>
          </ul>

          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <span className="sr-only">Instagram</span>
                <TbBrandInstagram className="h-8 w-8 text-black dark:text-white" />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/parth-kadam-7b27a2224/"
                target="_blank"
              >
                <span className="sr-only">Linkedin</span>
                <TbBrandLinkedin className="h-8 w-8 text-black dark:text-white" />
              </a>
            </li>

            <li>
              <a
                href="https://github.com/Parth18062003/Blockchain_Storage"
                target="_blank"
              >
                <span className="sr-only">GitHub</span>
                <BiLogoGithub className="h-8 w-8 text-black dark:text-white" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
