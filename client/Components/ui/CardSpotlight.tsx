'use client';
import React, { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa'; // Import the check icon from react-icons

// Define the type for props
interface CardSpotlightProps {
  name: string;
  price: string;
  features: string[];
}

const CardSpotlight: React.FC<CardSpotlightProps> = ({ name, price, features }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative flex flex-col items-center justify-center md:h-96 md:w-96 overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-r from-white to-gray-200 px-6 py-8 shadow-xl transition-transform duration-300 transform hover:scale-105 dark:border-gray-800 dark:bg-gradient-to-r dark:from-black dark:to-gray-950'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            opacity > 0
              ? document.documentElement.classList.contains('dark')
                ? 'rgba(255,182,255,.1)' // Dark mode gradient color
                : 'rgba(0,0,139,0.2)' // Dark blue gradient color for light mode
              : 'transparent'
          }, transparent 40%)`,
        }}
      />
      <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>{name}</h2>
      <p className='text-4xl font-extrabold text-gray-800 dark:text-gray-200'>{price}<span className='text-lg'>/month</span></p>
      <ul className='my-6 space-y-2 text-gray-600 dark:text-gray-400'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center space-x-2'>
            <FaCheck className='w-5 h-5 text-blue-500 dark:text-blue-400' />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button role="link" className="relative bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[length:100%_2px,0_2px] bg-[position:100%_100%,0_100%] bg-no-repeat text-neutral-950 dark:text-neutral-300 transition-[background-size,color] duration-500 hover:bg-[0_2px,100%_2px] hover:text-[#3b82f6]">
        View Plan
      </button>
    </div>
  );
};

export default CardSpotlight;
