"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../Components/ui/CanvasCards";

export function Cards() {
  return (
    <>
      <h1 className="mt-5 -mb-10 text-4xl dark:text-white text-black text-center font-bold">
        Pricing
      </h1>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-customwhite dark:bg-customblack w-full gap-4 mx-auto px-8">
        <Card title="0$" Card_title="Free">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-emerald-900"
          />

          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card title="5$" Card_title="Basic">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card title="10$" Card_title="Pro">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />

          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  children,
  Card_title,
}: {
  title: string;
  Card_title: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 h-[30rem] relative"
    >
      <div className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <div className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <div className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <div className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          <h2 className="text-2xl">{Card_title}</h2>
        </div>
        <p className="dark:text-white text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center">
          {title} <br />
          <span className="text-base">/month</span>
        </p>
        <h3 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center">
          {Card_title === "Free" && (
            <>
              <span>100MB of storage</span>
              <br />
              <span>
                Basic file storage and retrieval
                <br />
              </span>
              <span>
                Limited customer support
                <br />
              </span>
              <span>
                Ads may be displayed
                <br />
              </span>
            </>
          )}
          {Card_title === "Basic" && (
            <>
              <span>1GB of storage</span>
              <br />
              <span>
                Enhanced file storage and retrieval
                <br />
              </span>
              <span>
                Priority customer support
                <br />
              </span>
              <span>
                No ads displayed
                <br />
              </span>
            </>
          )}
          {Card_title === "Pro" && (
            <>
              <span>10GB of storage</span>
              <br />
              <span>Enhanced file storage and retrieval</span>
              <span>
                24/7 customer support
                <br />
              </span>
              <span>
                No ads displayed
                <br />
              </span>
            </>
          )}
        </h3>
      </div>
    </div>
  );
};
