"use client";
import React from "react";
import { WavyBackground } from "./ui/WavyBackground";
import EthImage from "./ui/EthImage";
import About from "./About";
import GithubGlobe from "./GithubGlobe";
import { HoverBorderGradient } from "./ui/CTAButton";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Cards } from "./Cards";

export function Hero() {
  const { userId } = useAuth();
  return (
    <>
      <WavyBackground className="mx-auto">
        <h1 className={`translate-y-28 sm:translate-y-60 text-5xl md:text-8xl lg:text-[12.5rem] text-black dark:text-white font-bold inter-var text-center ${!userId ? "translate-y-28 sm:translate-y-60" : "translate-y-14 sm:translate-y-40"}`}>
          Blockchain is cool
        </h1>
        {!userId ? (
          <div className="flex justify-center text-center -translate-y-20 xl:-translate-y-6 sm:-translate-y-40">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 z-50"
            >
              <Link href="/sign-in" className="text-3xl sm:text-5xl">Get Started</Link>
            </HoverBorderGradient>
          </div>
        ) : (
          <div></div>
        )}

        <EthImage />
      </WavyBackground>
      <About />
      <GithubGlobe />
      <Cards />
    </>
  );
}
