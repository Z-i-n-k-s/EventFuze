import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JoinClub = ({ isDarkMode }) => {
  const navigate = useNavigate();

  // Colors for light and dark modes
  const buttonColor = isDarkMode
    ? "bg-green-500 hover:bg-green-600 text-white"
    : "bg-green-600 hover:bg-green-800 text-white";

  // Animation variants for heading letters
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 200
      } 
    },
  };

  const heading = "Join Our Club";

  return (
    <motion.section
      className="bg-green-100 dark:bg-slate-900 w-full py-24 px-6 md:px-20 flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 flex flex-wrap justify-center text-green-500"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {heading.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={child}
            whileHover={{ 
              scale: 1.2, 
              color: isDarkMode ? "#86efac" : "#16a34a",
              transition: { duration: 0.2 }
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-center max-w-3xl mb-10 text-lg text-gray-800 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        viewport={{ once: false }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        Be part of a passionate community where innovation, collaboration, and
        creativity come alive. Together, we create impactful events, share
        knowledge, and build lifelong connections. Take the first step toward
        something exciting — your journey starts here!
      </motion.p>

      {/* Join Button */}
      <motion.button
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/joinform")}
        className={`px-10 py-4 rounded-xl font-semibold shadow-lg transition ${buttonColor}`}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        viewport={{ once: false }}
      >
        Join Our Team
      </motion.button>
    </motion.section>
  );
};

export default JoinClub;