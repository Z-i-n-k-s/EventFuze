import React, { useState, useEffect } from "react";

// Import images from your assets/home folder
import img1 from "../../../assest/home/cultural.png";
import img2 from "../../../assest/home/debate.jpg";
import img3 from "../../../assest/home/IDC.jpg";
import img4 from "../../../assest/home/islamic.jpg";
import img5 from "../../../assest/home/photo.jpg";
import img6 from "../../../assest/home/robotic.jpg";

import UpcomingEvent from "../../../components/user/UpcomingEvent";

const images = [img1, img2, img3, img4, img5, img6];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-0">
      {/* Slider Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Sliding Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-full h-[600px] object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Dark Shadow Overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-white dark:text-green-400">
            Eventify
          </h1>
          <p className="text-lg max-w-2xl px-4 drop-shadow-md text-white dark:text-gray-300">
            Discover, connect, and experience amazing events with ease
          </p>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index
                  ? "bg-white dark:bg-green-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <UpcomingEvent />
    </div>
  );
};

export default Home;
