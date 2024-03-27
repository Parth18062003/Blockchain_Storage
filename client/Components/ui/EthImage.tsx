import React from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import ethleft from "../../public/Assets/3d-eth-left.webp";

const EthImage = () => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      y: [-10, 10, -10], // Define the vertical positions for the animation
      transition: {
        duration: 3, // Duration of each movement
        repeat: Infinity, // Repeat the animation indefinitely
        repeatType: "reverse", // Reverse the animation direction after each repeat
      },
    });
  }, [controls]);

  return (
    <div className="flex justify-center items-center">
      <motion.div
        animate={controls}
        style={{ zIndex: 1 }}
      >
        <Image src={ethleft} width={700} height={700} alt="Hero" priority={true}/>
      </motion.div>
    </div>
  );
};

export default EthImage;
