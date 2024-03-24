import React from "react";
import { BentoGridDemo } from "./Bento";

const About = () => {
  return (
    <>
      <div className=" inset-x-0 -top-11 mt-[calc(-3/16*1rem)] flex items-end">
        <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-customblack dark:bg-[#fffafa]"></div>
        <div className="flex justify-between mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <svg
            viewBox="0 0 56 48"
            aria-hidden="true"
            className="-ml-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-customblack dark:fill-[#fffafa]"
          >
            <path d="M 2.686 3 H -4 V 48 H 56 V 47 H 53.314 A 8 8 0 0 1 47.657 44.657 L 8.343 5.343 A 8 8 0 0 0 2.686 3 Z"></path>
          </svg>
          <svg
            viewBox="0 0 56 48"
            aria-hidden="true"
            className="-mr-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-customblack dark:fill-[#fffafa]"
          >
            <path d="M 53.314 3 H 60 V 48 H 0 V 47 H 2.686 A 8 8 0 0 0 8.343 44.657 L 47.657 5.343 A 8 8 0 0 1 53.314 3 Z"></path>
          </svg>
        </div>
        <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-customblack dark:bg-[#fffafa]"></div>
      </div>

      <div className="min-h-screen bg-customblack dark:bg-[#fffafa] py-16">
        <BentoGridDemo />
      </div>



      <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
          <svg
            viewBox="0 0 64 48"
            className="w-16 flex-none fill-customwhite dark:fill-customblack"
            aria-hidden="true"
          >
            <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
          </svg>
          <div className="-mx-px flex-auto bg-customwhite dark:bg-customblack"></div>
          <svg
            viewBox="0 0 64 48"
            className="w-16 flex-none fill-customwhite dark:fill-customblack"
            aria-hidden="true"
          >
            <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default About;
