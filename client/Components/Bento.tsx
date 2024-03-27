import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";


export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-6xl mx-auto px-4">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}/* 
          icon={item.icon} */
          className={`col-span-1 ${i === 1 ? "md:row-span-2" : ""} ${i === 3 || i === 6 ? "md:col-span-1" : ""}`}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br dark:from-neutral-200 from-neutral-900 to-neutral-800 dark:to-neutral-100">
  </div>
);
const items = [
  {
    title: "Decentralized",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    /* icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />, */
  },
  {
    title: "End-to-End Encryption",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
  },
  {
    title: "Global Access",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
  },
  {
    title: "Immutable",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
  },
  {
    title: "Gasless Transactions",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
  },
];
