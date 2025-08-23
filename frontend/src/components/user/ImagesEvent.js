import React from 'react';
import { motion } from 'framer-motion';

// Import your event images
import event1 from '../../assest/eventImage/ev1.jpg';
import event2 from '../../assest/eventImage/ev2.jpg';
import event3 from '../../assest/eventImage/ev3.jpg';
import event4 from '../../assest/eventImage/ev4.jpg';
import event5 from '../../assest/eventImage/ev5.jpg';
import event6 from '../../assest/eventImage/ev6.jpg';
import event7 from '../../assest/eventImage/ev7.jpg';
import event8 from '../../assest/eventImage/ev8.jpg';

// Create an array of images (you can repeat some to fill space if needed)
const eventImages = [
  event1, event2, event3, event4, event5, event6, event7, event8,
  event2, event5 ,event2// added some again for better layout
];

const ImagesEvent = () => {
  return (
    <div className="py-16 px-6 bg-gray-100 dark:bg-slate-800">
      <div className="text-center mb-10">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
        >
          --Our Memorable Events--
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: false }}
        >
          A collection of our most memorable gatherings, workshops, and celebrations that bring our community together.
        </motion.p>
      </div>

      {/* Masonry layout with image repeat and clean spacing */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {eventImages.map((src, index) => (
          <motion.div 
            key={index} 
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={src}
              alt={`Event ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImagesEvent;