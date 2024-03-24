"use client";
import React from "react";
import { WavyBackground } from "./ui/WavyBackground";
import EthImage from "./ui/EthImage";
import About from "./About";

export function Hero() {
  return (
    <>
      <WavyBackground className="mx-auto">
        <h1 className="translate-y-28 sm:translate-y-60 text-5xl md:text-8xl lg:text-[12.5rem] text-black dark:text-white font-bold inter-var text-center">
          Blockchain is cool
        </h1>
        <p className="-translate-y-8 sm:-translate-y-2 text-sm md:text-3xl mt-4 text-black dark:text-white font-normal inter-var text-center">
          Leverage the power of blockchain for secure storage
        </p>
        <EthImage />
      </WavyBackground>
      <About />
    </>
  );
}
